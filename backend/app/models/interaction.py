from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.db.database import Base


class Interaction(Base):

    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    doctor_name = Column(String)

    hospital = Column(String)

    specialization = Column(String)

    meeting_date = Column(String)

    products = Column(Text)

    discussion = Column(Text)

    follow_up = Column(String)

    summary = Column(Text)

    outcome = Column(String)

    user = relationship("User", backref="interactions")