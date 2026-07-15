from app.graph.state import AgentState


VALID_INTENTS = {
    "log",
    "edit",
    "search",
    "summary",
    "followup",
}


def route_intent(state: AgentState):

    intent = (state.get("intent") or "").strip().lower()

    if intent in VALID_INTENTS:
        return intent

    return "summary"