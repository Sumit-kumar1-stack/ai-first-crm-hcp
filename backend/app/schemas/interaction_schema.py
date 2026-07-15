from pydantic import BaseModel
from typing import Optional


class ExtractInteractionRequest(BaseModel):
    conversation: str


class InteractionEntities(BaseModel):
    doctor: Optional[str] = None

    hospital: Optional[str] = None

    specialty: Optional[str] = None

    product: Optional[str] = None

    interaction_type: Optional[str] = None

    sentiment: Optional[str] = None

    follow_up: Optional[str] = None

    notes: Optional[str] = None