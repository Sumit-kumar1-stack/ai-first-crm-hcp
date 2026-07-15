from sqlalchemy.orm import Session

from app.repositories.user_repository import UserRepository

from app.auth.security import (
    verify_password,
    create_access_token,
)


class AuthService:

    @staticmethod
    def login(

        db: Session,

        email: str,

        password: str,

    ):

        user = UserRepository.get_by_email(

            db,

            email,

        )

        if not user:

            return None

        valid = verify_password(

            password,

            user.hashed_password,

        )

        if not valid:

            return None

        token = create_access_token(

            {

                "sub": user.email,

                "role": user.role,

                "id": user.id,

            }

        )

        return {

            "access_token": token,

            "token_type": "bearer",

            "user": {

                "id": user.id,

                "name": user.full_name,

                "email": user.email,

                "role": user.role,

            },

        }