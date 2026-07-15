import json

from app.services.ai_service import generate_response


PROMPT = """
You are an AI CRM assistant.

Extract the following information.

Return ONLY valid JSON.

{
 "doctor":"",
 "hospital":"",
 "specialty":"",
 "product":"",
 "interaction_type":"",
 "sentiment":"",
 "follow_up":"",
 "notes":""
}
"""


async def extract_entities(
    conversation: str,
):

    response = await generate_response(

        f"{PROMPT}\n\n{conversation}"

    )

    return json.loads(response)