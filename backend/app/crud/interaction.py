from sqlalchemy.orm import Session

from app.models.interaction import Interaction
from app.schemas.interaction import InteractionCreate


def create_interaction(db: Session, interaction: InteractionCreate):

    db_interaction = Interaction(**interaction.model_dump())

    db.add(db_interaction)

    db.commit()

    db.refresh(db_interaction)

    return db_interaction


def get_interactions(db: Session):

    return db.query(Interaction).all()


def get_interaction(db: Session, interaction_id: int):

    return (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )