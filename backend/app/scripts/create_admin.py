from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.user import User
from app.auth.security import hash_password


db: Session = SessionLocal()

existing = db.query(User).filter(
    User.email == "admin@crm.com"
).first()

if not existing:

    admin = User(

        full_name="System Admin",

        email="admin@crm.com",

        password=hash_password("Admin@123"),

        role="Admin",

    )

    db.add(admin)

    db.commit()

    print("Admin created")

else:

    print("Admin already exists")

db.close()