import "./AIInsightsPanel.css";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { saveInteraction, fetchHistory } from "../../redux/interactionSlice";
import { clearForm } from "../../redux/interactionFormSlice";
import { fetchDashboardStats } from "../../redux/dashboardSlice";

export default function SaveInteractionButton() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.interactionForm);
  const loading = useSelector((state) => state.interaction.loading);
  const [isSaving, setIsSaving] = useState(false);
  const isSubmittingRef = useRef(false);

  const isApproved = Boolean(form.approved);
  const isSaved = Boolean(form.saved);
  const isRejected = Boolean(form.rejected);
  const disabled = !isApproved || isSaved || isRejected || loading || isSaving;

  const save = async () => {
    if (disabled || isSubmittingRef.current) {
      return;
    }

    const payload = {
      doctor_name: (form.doctor || "").trim(),
      hospital: (form.hospital || "").trim(),
      specialization: (form.specialty || "").trim(),
      meeting_date: "",
      products: (form.product || "").trim(),
      discussion: (form.notes || "").trim(),
      follow_up: (form.follow_up || "").trim(),
    };

    if (
      !payload.doctor_name ||
      !payload.hospital ||
      !payload.products ||
      !payload.discussion ||
      !payload.follow_up
    ) {
      toast.error("Doctor, hospital, product, notes, and follow-up are required.");
      return;
    }

    isSubmittingRef.current = true;
    setIsSaving(true);

    try {
      const result = await dispatch(saveInteraction(payload));
      if (saveInteraction.fulfilled.match(result)) {
        dispatch(clearForm());
        dispatch(fetchHistory());
        dispatch(fetchDashboardStats());
        toast.success("Interaction saved successfully.");
      } else {
        toast.error("Unable to save interaction.");
      }
    } catch {
      toast.error("Unable to save interaction.");
    } finally {
      isSubmittingRef.current = false;
      setIsSaving(false);
    }
  };

  const getButtonText = () => {
    if (isSaving || loading) return "Saving...";
    if (isSaved) return "Saved";
    if (!isApproved) return "Save Interaction (Approval Required)";
    return "Save Interaction";
  };

  return (
    <button
      type="button"
      className="save-btn"
      onClick={save}
      disabled={disabled}
    >
      {getButtonText()}
    </button>
  );
}
