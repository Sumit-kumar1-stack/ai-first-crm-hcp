from app.graph.state import AgentState
from app.prompts.intent_prompt import INTENT_PROMPT
from app.services.ai_service import AIService


def detect_intent(state: AgentState):

    prompt = INTENT_PROMPT.format(
        user_input=state["user_input"]
    )

    intent = AIService.invoke(prompt)

    intent = intent.strip().lower().replace("`", "")

    # Some providers return a short explanation despite the prompt.  Retain
    # only the recognized intent instead of silently routing all such replies
    # to the summary node.
    intent = next(
        (value for value in ("log", "edit", "search", "summary", "followup") if value in intent),
        "summary",
    )

    print("Detected Intent:", intent)

    state["intent"] = intent

    return state
