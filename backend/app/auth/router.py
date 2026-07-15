from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.auth.schemas import LoginRequest

from app.auth.service import AuthService


router = APIRouter(

    prefix="/auth",

    tags=["Authentication"],

)


@router.post("/login")

def login(

    request: LoginRequest,

    db: Session = Depends(get_db),

):

    response = AuthService.login(

        db,

        request.email,

        request.password,

    )

    if not response:

        raise HTTPException(

            status_code=401,

            detail="Invalid email or password",

        )

    return response