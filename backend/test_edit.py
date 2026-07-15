from app.graph.graph import graph

from app.db.database import SessionLocal



db = SessionLocal()



state={

"user_input":
"Edit interaction 1 and change follow_up to Monday",

"intent":None,

"response":None,

"db":db

}


result=graph.invoke(state)


print(
    result["response"]
)


db.close()