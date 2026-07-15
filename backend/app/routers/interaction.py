from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.schemas.interaction import (
    InteractionCreate,
    InteractionResponse
)

from app.crud.interaction import (
    create_interaction,
    get_interaction,
    get_interactions
)

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"]
)


@router.post("/", response_model=InteractionResponse)
def create(data: InteractionCreate, db: Session = Depends(get_db)):
    return create_interaction(db, data)


@router.get("/", response_model=list[InteractionResponse])
def list_all(db: Session = Depends(get_db)):
    return get_interactions(db)


@router.get("/{interaction_id}", response_model=InteractionResponse)
def get_one(interaction_id: int, db: Session = Depends(get_db)):
    return get_interaction(db, interaction_id)