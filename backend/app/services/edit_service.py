import json

from app.services.ai_service import AIService

from app.prompts.edit_prompt import EDIT_PROMPT

from app.schemas.edit import EditInteraction



class EditService:


    @staticmethod
    def extract(message):

        prompt = EDIT_PROMPT.format(
            conversation=message
        )


        response = AIService.invoke(prompt)


        cleaned = (
            response
            .replace("```json","")
            .replace("```","")
            .strip()
        )


        data = json.loads(cleaned)


        return EditInteraction(**data)