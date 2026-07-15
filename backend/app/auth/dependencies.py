from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer

from app.auth.jwt import decode_token

security = HTTPBearer()


def get_current_user(

    credentials=Depends(security),

):

    try:

        payload = decode_token(

            credentials.credentials

        )

        return payload

    except Exception:

        raise HTTPException(

            status_code=401,

            detail="Invalid Token",

        )