from pydantic import BaseModel


class LoginRequest(BaseModel):

    email: str

    password: str


class Token(BaseModel):

    access_token: str

    token_type: str


class TokenData(BaseModel):

    email: str | None = None


class UserResponse(BaseModel):

    id: int

    full_name: str

    email: str

    role: str

    class Config:

        from_attributes = True