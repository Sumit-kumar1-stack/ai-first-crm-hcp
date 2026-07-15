from sqlalchemy import Column, Integer, String, Text

from app.db.database import Base


class Interaction(Base):

    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    doctor_name = Column(String)

    hospital = Column(String)

    specialization = Column(String)

    meeting_date = Column(String)

    products = Column(Text)

    discussion = Column(Text)

    follow_up = Column(String)

    summary = Column(Text)

    outcome = Column(String)