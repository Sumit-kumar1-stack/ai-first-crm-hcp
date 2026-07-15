from langgraph.graph import StateGraph, END

from app.graph.state import AgentState
from app.graph.nodes import detect_intent
from app.graph.router import route_intent

from app.graph.tools import (
    log_tool,
    edit_tool,
    search_tool,
    summary_tool,
    followup_tool,
)

builder = StateGraph(AgentState)

builder.add_node("detect_intent", detect_intent)

builder.add_node("log", log_tool)
builder.add_node("edit", edit_tool)
builder.add_node("search", search_tool)
builder.add_node("summary", summary_tool)
builder.add_node("followup", followup_tool)

builder.set_entry_point("detect_intent")

builder.add_conditional_edges(
    "detect_intent",
    route_intent,
    {
        "log": "log",
        "edit": "edit",
        "search": "search",
        "summary": "summary",
        "followup": "followup",
    },
)

builder.add_edge("log", END)
builder.add_edge("edit", END)
builder.add_edge("search", END)
builder.add_edge("summary", END)
builder.add_edge("followup", END)

graph = builder.compile()