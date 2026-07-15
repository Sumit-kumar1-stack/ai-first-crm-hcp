import json

from app.services.ai_service import AIService

from app.prompts.search_prompt import SEARCH_PROMPT

from app.schemas.search import SearchHCP



class SearchService:


    @staticmethod
    def extract(message):

        prompt = SEARCH_PROMPT.format(
            conversation=message
        )


        response = AIService.invoke(prompt)


        cleaned = (
            response
            .replace("```json","")
            .replace("```","")
            .strip()
        )


        data=json.loads(cleaned)


        return SearchHCP(**data)