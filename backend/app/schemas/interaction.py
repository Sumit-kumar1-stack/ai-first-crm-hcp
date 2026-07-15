from pydantic import BaseModel


class InteractionCreate(BaseModel):
    doctor_name: str
    hospital: str
    specialization: str = ""
    meeting_date: str = ""
    products: str
    discussion: str
    follow_up: str


class InteractionUpdate(BaseModel):
    doctor_name: str | None = None
    hospital: str | None = None
    specialization: str | None = None
    meeting_date: str | None = None
    products: str | None = None
    discussion: str | None = None
    follow_up: str | None = None
    summary: str | None = None
    outcome: str | None = None


class InteractionResponse(InteractionCreate):
    id: int
    summary: str
    outcome: str

    class Config:
        from_attributes = True