from app.services.extraction_service import ExtractionService
from app.services.edit_service import EditService
from app.services.search_service import SearchService
from app.services.ai_service import AIService
from app.services.followup_service import FollowupService

from app.repositories.interaction_repository import (
    InteractionRepository,
)

# =====================================================
# LOG TOOL
# =====================================================

def log_tool(state):

    interaction = ExtractionService.extract(
        state["user_input"]
    )

    recommendation = FollowupService.generate(
        interaction.summary
    )

    products_str = (
        ", ".join(interaction.products)
        if isinstance(interaction.products, list)
        else (interaction.products or "")
    )

    state["extracted_data"] = {
        "doctor": interaction.doctor_name,
        "hospital": interaction.hospital,
        "specialization": interaction.specialization,
        "product": products_str,
        "follow_up": interaction.follow_up,
        "notes": interaction.discussion,
    }

    state["summary"] = interaction.summary

    state["recommendations"] = recommendation.model_dump()

    state["confidence"] = 0.95

    state["result"] = {
        "doctor_name": interaction.doctor_name,
        "hospital": interaction.hospital,
        "specialization": interaction.specialization,
        "meeting_date": interaction.meeting_date,
        "products": products_str,
        "discussion": interaction.discussion,
        "summary": interaction.summary,
        "follow_up": interaction.follow_up,
        "outcome": interaction.outcome,
    }

    state["response"] = "Interaction details extracted. Ready for review."

    return state


# =====================================================
# EDIT TOOL
# =====================================================

def edit_tool(state):

    update = EditService.extract(
        state["user_input"]
    )

    allowed_fields = {
        "doctor_name", "hospital", "specialization", "meeting_date",
        "products", "discussion", "follow_up", "summary", "outcome",
    }

    if update.field not in allowed_fields:
        state["result"] = None
        state["response"] = "That interaction field cannot be updated."
        return state

    interaction = InteractionRepository.update(
        state["db"],
        update.interaction_id,
        update.field,
        update.new_value,
        user_id=state.get("user_id"),
    )

    if not interaction:
        state["result"] = None
        state["response"] = "Interaction not found."
        return state

    state["result"] = {
        "id": interaction.id,
        "doctor_name": interaction.doctor_name,
        "hospital": interaction.hospital,
        "products": interaction.products,
        "summary": interaction.summary,
        "follow_up": interaction.follow_up,
        "outcome": interaction.outcome,
    }

    state["response"] = "Interaction updated successfully."

    return state


# =====================================================
# SEARCH TOOL
# =====================================================

def search_tool(state):

    search = SearchService.extract(
        state["user_input"]
    )

    records = InteractionRepository.search_by_doctor(
        state["db"],
        search.doctor_name,
        user_id=state.get("user_id"),
    )

    state["result"] = [
        {
            "id": r.id,
            "doctor_name": r.doctor_name,
            "hospital": r.hospital,
            "products": r.products,
            "summary": r.summary,
            "follow_up": r.follow_up,
            "outcome": r.outcome,
        }
        for r in records
    ]

    state["response"] = f"{len(records)} interaction(s) found."

    return state


# =====================================================
# SUMMARY TOOL
# =====================================================

def summary_tool(state):

    prompt = f"""
Create a professional CRM summary from this interaction.

Interaction:

{state["user_input"]}

Return only the summary.
"""

    summary = AIService.invoke(prompt)

    state["result"] = {
        "summary": summary,
    }

    state["summary"] = summary

    state["response"] = "Summary generated successfully."

    return state


# =====================================================
# FOLLOW-UP TOOL
# =====================================================

def followup_tool(state):

    doctor = SearchService.extract(
        state["user_input"]
    )

    history = InteractionRepository.get_history(
        state["db"],
        doctor.doctor_name,
        user_id=state.get("user_id"),
    )

    recommendation = FollowupService.generate(
        history
    )

    state["result"] = recommendation.model_dump()
    state["recommendations"] = recommendation.model_dump()

    state["response"] = "Follow-up recommendation generated."

    return state
