import json
import time
from pathlib import Path

from app.services.llm import llm

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
# #endregion


class AIService:

    @staticmethod
    def invoke(prompt: str):
        # #region agent log
        _agent_log(
            "ai_service.py:invoke:entry",
            "Invoking LLM",
            {
                "promptLength": len(prompt),
                "llmModel": getattr(llm, "model", None),
                "llmClass": type(llm).__name__,
            },
            "B",
        )
        # #endregion

        try:
            response = llm.invoke(prompt)
        except Exception as exc:
            # #region agent log
            _agent_log(
                "ai_service.py:invoke:error",
                "LLM invoke failed",
                {
                    "errorType": type(exc).__name__,
                    "errorMessage": str(exc)[:500],
                    "llmModel": getattr(llm, "model", None),
                },
                "A",
            )
            # #endregion
            raise

        # #region agent log
        _agent_log(
            "ai_service.py:invoke:success",
            "LLM invoke succeeded",
            {
                "responseLength": len(getattr(response, "content", "") or ""),
                "llmModel": getattr(llm, "model", None),
            },
            "E",
        )
        # #endregion

        return response.content