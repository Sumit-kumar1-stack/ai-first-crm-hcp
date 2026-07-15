from app.config import LLM_PROVIDER

if LLM_PROVIDER == "gemini":
    from app.services.gemini_service import llm

elif LLM_PROVIDER == "groq":
    from app.services.groq_service import llm

else:
    raise Exception("Unsupported LLM Provider")