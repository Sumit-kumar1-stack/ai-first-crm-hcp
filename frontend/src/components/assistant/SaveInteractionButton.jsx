import "./AIInsightsPanel.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { saveInteraction, fetchHistory } from "../../redux/interactionSlice";
import { clearForm } from "../../redux/interactionFormSlice";
import { fetchDashboardStats } from "../../redux/dashboardSlice";

export default function SaveInteractionButton() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.interactionForm);
  const loading = useSelector((state) => state.interaction.loading);

  const save = async () => {
    const payload = {
      doctor_name: form.doctor.trim(),
      hospital: form.hospital.trim(),
      specialization: form.specialty.trim(),
      meeting_date: "",
      products: form.product.trim(),
      discussion: form.notes.trim(),
      follow_up: form.follow_up.trim(),
    };

    if (!payload.doctor_name || !payload.hospital || !payload.products || !payload.discussion || !payload.follow_up) {
      toast.error("Doctor, hospital, product, notes, and follow-up are required.");
      return;
    }

    const result = await dispatch(saveInteraction(payload));
    if (saveInteraction.fulfilled.match(result)) {
      dispatch(clearForm());
      dispatch(fetchHistory());
      dispatch(fetchDashboardStats());
      toast.success("Interaction saved successfully.");
    } else {
      toast.error("Unable to save interaction.");
    }
  };

  return <button className="save-btn" onClick={save} disabled={loading}>Save Interaction</button>;
}
