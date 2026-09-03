from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base, engine

# Import models so SQLAlchemy registers them
import app.models

# Routers
from app.api.agent import router as agent_router
from app.api.interactions import router as interaction_router
from app.routes.analytics import router as analytics_router
from app.routes.auth import router as auth_router


import os

# Create Database Tables automatically in development only if explicitly enabled.
# Production uses Alembic migrations as the authoritative schema management mechanism.
if os.getenv("AUTO_CREATE_TABLES", "false").lower() in ("true", "1"):
    Base.metadata.create_all(bind=engine)


# =====================================
# FastAPI App
# =====================================

app = FastAPI(
    title="AI First CRM HCP",
    version="1.0.0",
    description="Production AI CRM Backend",
)


# =====================================
# CORS
# =====================================

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================
# Routers
# =====================================

app.include_router(auth_router)

app.include_router(agent_router)

app.include_router(interaction_router)

app.include_router(analytics_router)


# =====================================
# Health Check
# =====================================

@app.get("/")
def home():

    return {

        "status": "success",

        "message": "AI CRM Backend Running",

        "version": "1.0.0",

    }