from app.graph.graph import graph


state={

"user_input":
"""
Dr Sharma from Apollo Hospital discussed CardioX.
He requested clinical evidence.
Follow up next Monday.
""",

"intent":None,

"response":None,

"db":None

}



result=graph.invoke(state)


print(result["response"])