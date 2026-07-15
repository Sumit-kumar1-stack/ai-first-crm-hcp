from pydantic import BaseModel


class FollowUpRecommendation(BaseModel):
    next_action: str
    priority: str
    recommended_date: str
    reason: str