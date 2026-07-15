from typing import Any

from pydantic import BaseModel


class AgentRequest(BaseModel):
    message: str


class AgentResponse(BaseModel):

    status: str

    message: str

    intent: str | None = None

    data: Any | None = None

    entities: dict | None = None

    summary: str | None = None

    recommendations: Any | None = None

    confidence: float | None = None