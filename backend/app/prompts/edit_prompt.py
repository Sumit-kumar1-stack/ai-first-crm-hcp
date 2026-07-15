EDIT_PROMPT = """

You are a CRM assistant.

Extract update information from this request.

Return ONLY JSON.

Use this format:

{{
 "interaction_id": "",
 "field": "",
 "new_value": ""
}}

Rules:
- interaction_id must be a number
- field must be the database field name
- new_value must contain the new value

User request:

{conversation}

"""