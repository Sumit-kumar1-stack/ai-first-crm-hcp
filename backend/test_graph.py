from app.graph.graph import graph
from app.db.database import SessionLocal


db = SessionLocal()


state = {

    "user_input": """
I met Dr Sharma at Apollo Hospital.

Discussed CardioX.

Doctor requested clinical papers.

Follow up next Monday.
""",

    "intent": None,

    "response": None,

    "db": db
}


result = graph.invoke(state)


print(result["response"])


db.close()