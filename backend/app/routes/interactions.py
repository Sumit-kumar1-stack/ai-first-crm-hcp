from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.models.interaction import Interaction

from app.schemas.interaction import (
    InteractionCreate,
    InteractionUpdate,
    InteractionResponse,
)

from app.repositories.interaction_repository import (
    InteractionRepository,
)

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"],
)


# ==========================================
# Get All Interactions
# ==========================================

@router.get("/", response_model=list[InteractionResponse])
def get_all(
    db: Session = Depends(get_db),
):
    return db.query(Interaction).all()


# ==========================================
# Search Interactions
# ==========================================

@router.get("/search", response_model=list[InteractionResponse])
def search_interactions(
    q: str = Query(...),
    db: Session = Depends(get_db),
):

    return InteractionRepository.search(
        db,
        q,
    )


# ==========================================
# Get Single Interaction
# ==========================================

@router.get("/{interaction_id}", response_model=InteractionResponse)
def get_one(
    interaction_id: int,
    db: Session = Depends(get_db),
):

    interaction = (
        db.query(Interaction)
        .filter(
            Interaction.id == interaction_id
        )
        .first()
    )

    if not interaction:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    return interaction


# ==========================================
# Create Interaction
# ==========================================

@router.post("/", response_model=InteractionResponse)
def create_interaction(
    request: InteractionCreate,
    db: Session = Depends(get_db),
):

    interaction = Interaction(

        doctor_name=request.doctor_name,

        hospital=request.hospital,

        specialization=request.specialization,

        meeting_date=request.meeting_date,

        products=request.products,

        discussion=request.discussion,

        follow_up=request.follow_up,

        summary="Interaction logged successfully",

        outcome="Pending",

    )

    db.add(interaction)

    db.commit()

    db.refresh(interaction)

    return interaction


# ==========================================
# Update Interaction
# ==========================================

@router.put("/{interaction_id}", response_model=InteractionResponse)
def update_interaction(
    interaction_id: int,
    request: InteractionUpdate,
    db: Session = Depends(get_db),
):

    interaction = (
        db.query(Interaction)
        .filter(
            Interaction.id == interaction_id
        )
        .first()
    )

    if not interaction:

        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    data = request.model_dump(
        exclude_unset=True
    )

    for key, value in data.items():

        setattr(
            interaction,
            key,
            value,
        )

    db.commit()

    db.refresh(interaction)

    return interaction


# ==========================================
# Delete Interaction
# ==========================================

@router.delete("/{interaction_id}")
def delete_interaction(
    interaction_id: int,
    db: Session = Depends(get_db),
):

    interaction = (
        db.query(Interaction)
        .filter(
            Interaction.id == interaction_id
        )
        .first()
    )

    if not interaction:

        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    db.delete(interaction)

    db.commit()

    return {
        "message": "Deleted successfully"
    }