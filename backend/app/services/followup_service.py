import json

from app.services.ai_service import AIService
from app.prompts.followup_prompt import FOLLOWUP_PROMPT
from app.schemas.followup import FollowUpRecommendation


class FollowupService:

    @staticmethod
    def generate(history: str):

        prompt = FOLLOWUP_PROMPT.format(
            history=history
        )

        response = AIService.invoke(prompt)

        cleaned = (
            response.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        data = json.loads(cleaned)

        return FollowUpRecommendation(**data)