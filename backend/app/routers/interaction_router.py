from fastapi import APIRouter

from app.schemas.interaction_schema import (
    ExtractInteractionRequest,
)

from app.services.entity_extractor import (
    extract_entities,
)

router = APIRouter(
    prefix="/interaction",
    tags=["Interaction"],
)


@router.post("/extract")
async def extract(
    request: ExtractInteractionRequest,
):
    return await extract_entities(
        request.conversation
    )