from app.graph.graph import graph

from app.db.database import SessionLocal



db=SessionLocal()



state={

"user_input":
"Show me all interactions with Dr Sharma",

"intent":None,

"response":None,

"db":db

}



result=graph.invoke(state)


print(result["response"])


db.close()