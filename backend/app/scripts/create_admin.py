import os
import sys
from getpass import getpass
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.user import User
from app.auth.password import hash_password


def create_admin():
    db: Session = SessionLocal()
    try:
        admin_email = os.getenv("ADMIN_EMAIL", "admin@crm.com")
        admin_name = os.getenv("ADMIN_NAME", "System Admin")

        existing = db.query(User).filter(User.email == admin_email).first()

        if not existing:
            admin_password = os.getenv("ADMIN_PASSWORD")
            if not admin_password:
                if sys.stdin.isatty():
                    admin_password = getpass("Enter admin password: ")
                else:
                    raise ValueError(
                        "ADMIN_PASSWORD environment variable must be set in non-interactive environments"
                    )

            if not admin_password or len(admin_password.strip()) < 8:
                raise ValueError("Admin password must be at least 8 characters long")

            admin = User(
                full_name=admin_name,
                email=admin_email,
                password=hash_password(admin_password.strip()),
                role="Admin",
                is_active=True,
            )

            db.add(admin)
            db.commit()
            print("Admin created successfully.")
        else:
            print("Admin already exists.")
    finally:
        db.close()


if __name__ == "__main__":
    create_admin()