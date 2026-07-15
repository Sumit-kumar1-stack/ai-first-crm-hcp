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

  return (

    <div className="approve-actions">

      <button
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
        className={
          !approved
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