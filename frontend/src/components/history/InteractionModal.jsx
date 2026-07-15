import { useState } from "react";
import "./InteractionModal.css";

const fields = [
  ["doctor_name", "Doctor"], ["hospital", "Hospital"],
  ["specialization", "Specialization"], ["meeting_date", "Meeting Date"],
  ["products", "Products"], ["discussion", "Discussion"],
  ["follow_up", "Follow Up"], ["summary", "Summary"], ["outcome", "Outcome"],
];

function ModalContent({ interaction, onClose, editable, onSave }) {
  const [form, setForm] = useState(interaction);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{editable ? "Edit Interaction" : "Doctor Interaction"}</h2>
          <button onClick={onClose} type="button">×</button>
        </div>
        <div className="modal-body">
          {fields.map(([key, label]) => (
            <div className="row" key={key}>
              <label>{label}</label>
              {editable ? (
                key === "discussion" || key === "summary" ? (
                  <textarea value={form[key] || ""} onChange={(event) => setForm({ ...form, [key]: event.target.value })} />
                ) : (
                  <input value={form[key] || ""} onChange={(event) => setForm({ ...form, [key]: event.target.value })} />
                )
              ) : <p>{interaction[key] || "-"}</p>}
            </div>
          ))}
        </div>
        {editable && <button className="save-btn" type="button" onClick={() => onSave?.(form)}>Save changes</button>}
      </div>
    </div>
  );
}

export default function InteractionModal({ interaction, onClose, editable = false, onSave }) {
  if (!interaction) return null;
  return <ModalContent key={`${interaction.id}-${editable}`} interaction={interaction} onClose={onClose} editable={editable} onSave={onSave} />;
}
