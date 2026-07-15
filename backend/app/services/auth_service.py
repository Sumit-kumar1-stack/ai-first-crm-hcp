from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.models.user import User

from app.repositories.auth_repository import AuthRepository

from app.auth.password import (

    hash_password,

    verify_password,

)

from app.auth.jwt import create_access_token


class AuthService:

    @staticmethod
    def register(

        db: Session,

        request,

    ):

        existing = AuthRepository.get_user_by_email(

            db,

            request.email,

        )

        if existing:

            raise HTTPException(

                status_code=400,

                detail="Email already exists",

            )

        user = User(

            full_name=request.full_name,

            email=request.email,

            password=hash_password(

                request.password

            ),

            role=request.role,

        )

        return AuthRepository.create_user(

            db,

            user,

        )

    @staticmethod
    def login(

        db: Session,

        request,

    ):

        user = AuthRepository.get_user_by_email(

            db,

            request.email,

        )

        if not user:

            raise HTTPException(

                status_code=401,

                detail="Invalid email or password",

            )

        if not verify_password(

            request.password,

            user.password,

        ):

            raise HTTPException(

                status_code=401,

                detail="Invalid email or password",

            )

        token = create_access_token(

            {

                "id": user.id,

                "email": user.email,

                "role": user.role,

            }

        )

        return {

            "access_token": token,

            "token_type": "Bearer",

            "role": user.role,

            "full_name": user.full_name,

        }