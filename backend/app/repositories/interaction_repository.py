from app.models.interaction import Interaction
from sqlalchemy import or_


class InteractionRepository:

    @staticmethod
    def create(db, interaction_data, user_id: int):
        if not user_id:
            raise ValueError("user_id is required to create an interaction")

        products = (
            ",".join(interaction_data.products)
            if isinstance(interaction_data.products, list)
            else (interaction_data.products or "")
        )

        interaction = Interaction(
            user_id=user_id,
            doctor_name=interaction_data.doctor_name,
            hospital=interaction_data.hospital,
            specialization=getattr(interaction_data, "specialization", ""),
            meeting_date=getattr(interaction_data, "meeting_date", ""),
            products=products,
            discussion=getattr(interaction_data, "discussion", ""),
            follow_up=getattr(interaction_data, "follow_up", ""),
            summary=getattr(interaction_data, "summary", "Interaction logged successfully"),
            outcome=getattr(interaction_data, "outcome", "Pending"),
        )

        db.add(interaction)
        db.commit()
        db.refresh(interaction)

        return interaction

    @staticmethod
    def update(
        db,
        interaction_id: int,
        field: str,
        value,
        user_id: int | None = None,
    ):
        if not user_id:
            return None

        interaction = (
            db.query(Interaction)
            .filter(
                Interaction.id == interaction_id,
                Interaction.user_id == user_id,
            )
            .first()
        )

        if not interaction:
            return None

        if field == "user_id":
            return interaction

        setattr(interaction, field, value)

        db.commit()
        db.refresh(interaction)

        return interaction

    @staticmethod
    def search(db, query: str, user_id: int | None = None):
        if not user_id:
            return []

        return (
            db.query(Interaction)
            .filter(
                Interaction.user_id == user_id,
                or_(
                    Interaction.doctor_name.ilike(f"%{query}%"),
                    Interaction.hospital.ilike(f"%{query}%"),
                    Interaction.products.ilike(f"%{query}%"),
                    Interaction.discussion.ilike(f"%{query}%"),
                ),
            )
            .order_by(Interaction.id.desc())
            .all()
        )

    @staticmethod
    def search_by_doctor(
        db,
        doctor_name: str,
        user_id: int | None = None,
    ):
        if not user_id:
            return []

        return (
            db.query(Interaction)
            .filter(
                Interaction.user_id == user_id,
                Interaction.doctor_name.contains(doctor_name),
            )
            .order_by(Interaction.id.desc())
            .all()
        )

    @staticmethod
    def get_history(
        db,
        doctor_name: str,
        user_id: int | None = None,
    ):
        if not user_id:
            return ""

        interactions = (
            db.query(Interaction)
            .filter(
                Interaction.user_id == user_id,
                Interaction.doctor_name.contains(doctor_name),
            )
            .order_by(Interaction.id.desc())
            .all()
        )

        history = ""

        for item in interactions:
            history += f"""
Doctor: {item.doctor_name}
Hospital: {item.hospital}
Specialization: {item.specialization}
Meeting Date: {item.meeting_date}
Products: {item.products}
Discussion: {item.discussion}
Summary: {item.summary}
Outcome: {item.outcome}
Follow Up: {item.follow_up}

"""

        return history