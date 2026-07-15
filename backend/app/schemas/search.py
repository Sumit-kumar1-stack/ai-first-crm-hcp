from pydantic import BaseModel


class SearchHCP(BaseModel):

    doctor_name: str