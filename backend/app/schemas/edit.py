from pydantic import BaseModel


class EditInteraction(BaseModel):

    interaction_id: int

    field: str

    new_value: str