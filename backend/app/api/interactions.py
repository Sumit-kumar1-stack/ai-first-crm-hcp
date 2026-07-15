from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_


from app.db.database import get_db
from app.models.interaction import Interaction
from app.schemas.interaction import (
    InteractionCreate,
    InteractionUpdate,
    InteractionResponse,
)

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"],
)


@router.get("/", response_model=list[InteractionResponse])
def get_all(db: Session = Depends(get_db)):
    return db.query(Interaction).all()


@router.get("/search/", response_model=list[InteractionResponse])
def search_interactions(
    q: str,
    db: Session = Depends(get_db),
):

    results = (
        db.query(Interaction)
        .filter(
            or_(
                Interaction.doctor_name.ilike(f"%{q}%"),
                Interaction.hospital.ilike(f"%{q}%"),
                Interaction.products.ilike(f"%{q}%"),
            )
        )
        .all()
    )

    return results

@router.get("/{interaction_id}", response_model=InteractionResponse)
def get_one(interaction_id: int, db: Session = Depends(get_db)):
    interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    if not interaction:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    return interaction


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


@router.put("/{interaction_id}", response_model=InteractionResponse)
def update_interaction(
    interaction_id: int,
    request: InteractionUpdate,
    db: Session = Depends(get_db),
):

    interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    if not interaction:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    data = request.model_dump(exclude_unset=True)

    for key, value in data.items():
        setattr(interaction, key, value)

    db.commit()
    db.refresh(interaction)

    return interaction


@router.delete("/{interaction_id}")
def delete_interaction(
    interaction_id: int,
    db: Session = Depends(get_db),
):

    interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
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