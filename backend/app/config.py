from pathlib import Path
import os

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


DATABASE_URL = os.getenv("DATABASE_URL")

LLM_PROVIDER = os.getenv("LLM_PROVIDER")

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

GROQ_MODEL = os.getenv("GROQ_MODEL")

GEMINI_MODEL = os.getenv("GEMINI_MODEL")


SECRET_KEY = os.getenv("SECRET_KEY")

ALGORITHM = os.getenv("ALGORITHM", "HS256")

ACCESS_TOKEN_EXPIRE_MINUTES = int(

    os.getenv(

        "ACCESS_TOKEN_EXPIRE_MINUTES",

        60,

    )

)