import json
import time
from pathlib import Path

from langchain_google_genai import ChatGoogleGenerativeAI
from app.config import GOOGLE_API_KEY, GEMINI_MODEL, LLM_PROVIDER

# #region agent log
_DEBUG_LOG = Path(__file__).resolve().parents[3] / "debug-783cc6.log"


def _agent_log(location: str, message: str, data: dict, hypothesis_id: str) -> None:
    try:
        payload = {
            "sessionId": "783cc6",
            "location": location,
            "message": message,
            "data": data,
            "timestamp": int(time.time() * 1000),
            "hypothesisId": hypothesis_id,
        }
        with _DEBUG_LOG.open("a", encoding="utf-8") as log_file:
            log_file.write(json.dumps(payload) + "\n")
    except Exception:
        pass


_agent_log(
    "gemini_service.py:init",
    "LLM client configuration",
    {
        "llmProvider": LLM_PROVIDER,
        "geminiModel": GEMINI_MODEL,
        "apiKeyConfigured": bool(GOOGLE_API_KEY),
        "apiKeyLength": len(GOOGLE_API_KEY or ""),
    },
    "A",
)
# #endregion

llm = ChatGoogleGenerativeAI(
    model=GEMINI_MODEL,
    google_api_key=GOOGLE_API_KEY,
    temperature=0,
)