from pydantic import BaseModel
from typing import List


class InteractionAI(BaseModel):
    doctor_name: str
    hospital: str
    specialization: str
    meeting_date: str
    products: List[str]
    discussion: str
    follow_up: str
    summary: str
    outcome: str