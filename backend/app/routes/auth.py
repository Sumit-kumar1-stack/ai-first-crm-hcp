from fastapi import APIRouter

from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.auth_schema import (

    RegisterRequest,

    RegisterResponse,

    LoginRequest,

    TokenResponse,

)

from app.services.auth_service import AuthService

from app.auth.dependencies import (

    get_current_user,

)

router = APIRouter(

    prefix="/auth",

    tags=["Authentication"],

)


@router.post("/register", response_model=RegisterResponse)

def register(

    request: RegisterRequest,

    db: Session = Depends(get_db),

):

    return AuthService.register(

        db,

        request,

    )


@router.post("/login", response_model=TokenResponse)

def login(

    request: LoginRequest,

    db: Session = Depends(get_db),

):

    return AuthService.login(

        db,

        request,

    )


@router.get("/me")

def me(

    user=Depends(get_current_user),

):

    return user