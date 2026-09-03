import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.db.database import Base, get_db
from app.models.user import User
from app.models.interaction import Interaction
from app.auth.jwt import create_access_token
from app.auth.password import hash_password
from app.graph.tools import log_tool
from app.schemas.interaction_ai import InteractionAI

# Setup in-memory SQLite engine for tests
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
test_engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=test_engine,
)


@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)


@pytest.fixture
def db_session():
    connection = test_engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)

    yield session

    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture
def user_a(db_session):
    user = User(
        full_name="User Alpha",
        email="alpha@test.com",
        password=hash_password("password123"),
        role="MR",
        is_active=True,
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


@pytest.fixture
def user_b(db_session):
    user = User(
        full_name="User Beta",
        email="beta@test.com",
        password=hash_password("password123"),
        role="MR",
        is_active=True,
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


@pytest.fixture
def inactive_user(db_session):
    user = User(
        full_name="Inactive User",
        email="inactive@test.com",
        password=hash_password("password123"),
        role="MR",
        is_active=False,
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


@pytest.fixture
def token_a(user_a):
    return create_access_token({"sub": str(user_a.id), "id": user_a.id, "email": user_a.email, "role": user_a.role})


@pytest.fixture
def token_b(user_b):
    return create_access_token({"sub": str(user_b.id), "id": user_b.id, "email": user_b.email, "role": user_b.role})


@pytest.fixture
def token_inactive(inactive_user):
    return create_access_token({"sub": str(inactive_user.id), "id": inactive_user.id, "email": inactive_user.email, "role": inactive_user.role})


def test_user_a_creates_interaction(client, token_a, user_a):
    payload = {
        "doctor_name": "Dr. Smith",
        "hospital": "City Hospital",
        "specialization": "Cardiology",
        "meeting_date": "2026-09-03",
        "products": "CardioX",
        "discussion": "Discussed clinical trials",
        "follow_up": "Next Monday",
    }
    response = client.post(
        "/api/interactions/",
        json=payload,
        headers={"Authorization": f"Bearer {token_a}"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["doctor_name"] == "Dr. Smith"
    assert data["user_id"] == user_a.id


def test_user_b_cannot_list_user_a_interaction(client, token_a, token_b, user_a, user_b):
    # User A creates an interaction
    client.post(
        "/api/interactions/",
        json={
            "doctor_name": "Dr. Alpha Exclusive",
            "hospital": "Alpha Clinic",
            "specialization": "Neurology",
            "meeting_date": "2026-09-03",
            "products": "NeuroPlus",
            "discussion": "Private meeting",
            "follow_up": "2 weeks",
        },
        headers={"Authorization": f"Bearer {token_a}"},
    )

    # User B lists interactions
    response_b = client.get(
        "/api/interactions/",
        headers={"Authorization": f"Bearer {token_b}"},
    )
    assert response_b.status_code == 200
    interactions_b = response_b.json()
    # Ensure no interaction belonging to User A is returned
    for item in interactions_b:
        assert item["doctor_name"] != "Dr. Alpha Exclusive"
        assert item["user_id"] == user_b.id


def test_user_b_cannot_update_user_a_interaction(client, token_a, token_b):
    # User A creates an interaction
    res_a = client.post(
        "/api/interactions/",
        json={
            "doctor_name": "Dr. Target",
            "hospital": "Main Hospital",
            "specialization": "Oncology",
            "meeting_date": "2026-09-03",
            "products": "OncoShield",
            "discussion": "Initial meeting",
            "follow_up": "Tomorrow",
        },
        headers={"Authorization": f"Bearer {token_a}"},
    )
    interaction_id = res_a.json()["id"]

    # User B tries to update User A's interaction
    res_b = client.put(
        f"/api/interactions/{interaction_id}",
        json={"doctor_name": "Hacked Dr."},
        headers={"Authorization": f"Bearer {token_b}"},
    )
    assert res_b.status_code == 404


def test_user_b_cannot_delete_user_a_interaction(client, token_a, token_b):
    # User A creates an interaction
    res_a = client.post(
        "/api/interactions/",
        json={
            "doctor_name": "Dr. Permanent",
            "hospital": "General Hospital",
            "specialization": "Pediatrics",
            "meeting_date": "2026-09-03",
            "products": "PedioCure",
            "discussion": "Safety data",
            "follow_up": "In a month",
        },
        headers={"Authorization": f"Bearer {token_a}"},
    )
    interaction_id = res_a.json()["id"]

    # User B attempts to delete
    res_b = client.delete(
        f"/api/interactions/{interaction_id}",
        headers={"Authorization": f"Bearer {token_b}"},
    )
    assert res_b.status_code == 404


def test_analytics_for_user_b_excludes_user_a(client, token_a, token_b):
    # User A creates an interaction
    client.post(
        "/api/interactions/",
        json={
            "doctor_name": "Dr. Unique To Alpha",
            "hospital": "Alpha Hospital",
            "specialization": "Cardiology",
            "meeting_date": "2026-09-03",
            "products": "AlphaPill",
            "discussion": "Discussion",
            "follow_up": "Next week",
        },
        headers={"Authorization": f"Bearer {token_a}"},
    )

    # User B requests dashboard analytics
    response = client.get(
        "/api/analytics/dashboard",
        headers={"Authorization": f"Bearer {token_b}"},
    )
    assert response.status_code == 200
    analytics = response.json()
    assert analytics["summary"]["total_interactions"] == 0
    assert analytics["summary"]["total_doctors"] == 0
    assert len(analytics["recent_activity"]) == 0


def test_inactive_user_token_is_rejected(client, token_inactive):
    response = client.get(
        "/api/interactions/",
        headers={"Authorization": f"Bearer {token_inactive}"},
    )
    assert response.status_code == 403
    assert "inactive" in response.json()["detail"].lower()


def test_log_tool_does_not_persist_interaction_to_database(db_session):
    mock_extracted = InteractionAI(
        doctor_name="Dr. Extraction Only",
        hospital="AI Clinic",
        specialization="Dermatology",
        meeting_date="2026-09-03",
        products=["DermaClear"],
        discussion="No auto-save discussion",
        follow_up="Friday",
        summary="AI generated summary",
        outcome="Pending",
    )

    mock_recommendation = MagicMock()
    mock_recommendation.model_dump.return_value = {
        "next_action": "Follow up Friday",
        "priority": "High",
        "recommended_date": "2026-09-08",
        "reason": "Test reason",
    }

    state = {
        "user_input": "I visited Dr. Extraction Only at AI Clinic.",
        "db": db_session,
    }

    with patch("app.services.extraction_service.ExtractionService.extract", return_value=mock_extracted), \
         patch("app.services.followup_service.FollowupService.generate", return_value=mock_recommendation):
        output_state = log_tool(state)

    # Verify structured fields returned in state
    assert output_state["extracted_data"]["doctor"] == "Dr. Extraction Only"
    assert output_state["result"]["doctor_name"] == "Dr. Extraction Only"
    assert output_state["result"]["summary"] == "AI generated summary"

    # Verify that NO record was written to the database!
    db_records = db_session.query(Interaction).filter(Interaction.doctor_name == "Dr. Extraction Only").all()
    assert len(db_records) == 0
