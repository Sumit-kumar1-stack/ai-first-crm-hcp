from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.repositories.analytics_repository import AnalyticsRepository

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
):

    return AnalyticsRepository.get_dashboard_stats(
        db
    )