import "./AIInsightsPanel.css";

import { useDispatch, useSelector } from "react-redux";

import {
  approveExtraction,
  rejectExtraction,
} from "../../redux/interactionFormSlice";

export default function ApproveRejectButtons() {
  const dispatch = useDispatch();

  const approved = useSelector(
    (state) => state.interactionForm.approved
  );

  const rejected = useSelector(
    (state) => state.interactionForm.rejected
  );

  return (
    <div className="approve-actions">
      <button
        type="button"
        className={
          approved
            ? "approve-btn active"
            : "approve-btn"
        }
        onClick={() => dispatch(approveExtraction())}
      >
        ✓ Approve
      </button>

      <button
        type="button"
        className={
          rejected
            ? "reject-btn active"
            : "reject-btn"
        }
        onClick={() => dispatch(rejectExtraction())}
      >
        ✕ Reject
      </button>
    </div>
  );
}