from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.auth.dependencies import get_current_user
from app.schemas.agent import (
    AgentRequest,
    AgentResponse,
)
from app.graph.graph import graph

router = APIRouter(
    prefix="/agent",
    tags=["AI Agent"],
    dependencies=[Depends(get_current_user)],
)


@router.post(
    "/chat",
    response_model=AgentResponse,
)
def chat(
    request: AgentRequest,
    db: Session = Depends(get_db),
):

    state = {
        "user_input": request.message,
        "intent": None,
        "response": None,
        "result": None,
        "summary": None,
        "recommendations": None,
        "confidence": 0.95,
        "transcript": request.message,
        "error": None,
        "extracted_data": None,
        "db": db,
    }

    try:
        result = graph.invoke(state)
    except Exception as exc:
        # Keep provider/parser failures from becoming opaque framework 500s.
        raise HTTPException(
            status_code=502,
            detail=f"AI assistant could not complete the request: {exc}",
        ) from exc

    return AgentResponse(
        status="success",
        message=result.get("response") or "Completed",
        intent=result.get("intent"),
        data=result.get("result"),
        entities=result.get("extracted_data"),
        summary=result.get("summary"),
        recommendations=result.get("recommendations"),
        confidence=result.get("confidence"),
    )
