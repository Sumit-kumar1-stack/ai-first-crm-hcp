from typing import TypedDict, Optional, Any


class AgentState(TypedDict):

    # ==========================
    # User Input
    # ==========================

    user_input: str

    # ==========================
    # Intent Detection
    # ==========================

    intent: Optional[str]

    # ==========================
    # Database Session
    # ==========================

    db: Any

    # ==========================
    # Entity Extraction
    # ==========================

    extracted_data: Optional[dict]

    # ==========================
    # Tool Output
    # ==========================

    result: Optional[dict]

    # ==========================
    # AI Chat Response
    # ==========================

    response: Optional[str]

    # ==========================
    # AI Generated Summary
    # ==========================

    summary: Optional[str]

    # ==========================
    # AI Recommendations
    # ==========================

    recommendations: Optional[list]

    # ==========================
    # Entity Confidence
    # ==========================

    confidence: Optional[float]

    # ==========================
    # Conversation Transcript
    # ==========================

    transcript: Optional[str]

    # ==========================
    # Error Handling
    # ==========================

    error: Optional[str]