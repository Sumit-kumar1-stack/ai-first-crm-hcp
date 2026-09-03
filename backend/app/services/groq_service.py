from langchain_groq import ChatGroq
from app.config import GROQ_API_KEY, GROQ_MODEL

llm = ChatGroq(
    model=GROQ_MODEL or "gemma2-9b-it",
    api_key=GROQ_API_KEY,
    temperature=0,
)