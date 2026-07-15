import json

from app.services.ai_service import AIService
from app.prompts.extraction_prompt import EXTRACTION_PROMPT
from app.schemas.interaction_ai import InteractionAI


class ExtractionService:

    @staticmethod
    def extract(conversation: str):

        prompt = EXTRACTION_PROMPT.format(
            conversation=conversation
        )

        response = AIService.invoke(prompt)

        # Remove markdown fences if present
        cleaned = (
            response.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        data = json.loads(cleaned)

        return InteractionAI(**data)