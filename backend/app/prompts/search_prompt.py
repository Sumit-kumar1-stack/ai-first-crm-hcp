SEARCH_PROMPT = """

You are a CRM assistant.

Extract the healthcare professional name from the request.

Return ONLY JSON.

Format:

{{
 "doctor_name":""
}}

Request:

{conversation}

"""