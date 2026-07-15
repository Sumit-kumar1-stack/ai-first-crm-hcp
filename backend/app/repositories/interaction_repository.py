from app.models.interaction import Interaction
from sqlalchemy import or_


class InteractionRepository:

    @staticmethod
    def create(db, interaction_data):

        interaction = Interaction(
            doctor_name=interaction_data.doctor_name,
            hospital=interaction_data.hospital,
            specialization=interaction_data.specialization,
            meeting_date=interaction_data.meeting_date,
            products=",".join(interaction_data.products),
            discussion=interaction_data.discussion,
            follow_up=interaction_data.follow_up,
            summary=interaction_data.summary,
            outcome=interaction_data.outcome,
        )

        db.add(interaction)
        db.commit()
        db.refresh(interaction)

        return interaction

    @staticmethod
    def update(
        db,
        interaction_id,
        field,
        value,
    ):

        interaction = (
            db.query(Interaction)
            .filter(Interaction.id == interaction_id)
            .first()
        )

        if not interaction:
            return None

        setattr(interaction, field, value)

        db.commit()
        db.refresh(interaction)

        return interaction
    
    @staticmethod
    def search(db, query: str):

        return (

            db.query(Interaction)

            .filter(

                or_(

                    Interaction.doctor_name.ilike(f"%{query}%"),

                    Interaction.hospital.ilike(f"%{query}%"),

                    Interaction.products.ilike(f"%{query}%"),

                    Interaction.discussion.ilike(f"%{query}%"),

                )

            )

            .order_by(Interaction.id.desc())

            .all()

        )

    @staticmethod
    def search_by_doctor(
        db,
        doctor_name,
    ):

        records = (
            db.query(Interaction)
            .filter(
                Interaction.doctor_name.contains(
                    doctor_name
                )
            )
            .all()
        )

        return records

    @staticmethod
    def get_history(
        db,
        doctor_name,
    ):

        interactions = (
            db.query(Interaction)
            .filter(
                Interaction.doctor_name.contains(
                    doctor_name
                )
            )
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