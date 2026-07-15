export default function ChatMessage({ message }) {

  // USER MESSAGE
  if (message.type === "user") {
    return (
      <div className="user-message">
        <div className="user-bubble">
          {message.content}
        </div>
      </div>
    );
  }

  // AI RESPONSE
  const data = message.content;

  return (

    <div className="ai-message">

      <div className="avatar">
        🤖
      </div>

      <div className="bubble">

        <h3>AI CRM Assistant</h3>

        <div className="status success">
          ✅ Interaction Processed
        </div>

        <div className="crm-grid">

          <div className="crm-item">
            <strong>Doctor</strong>
            <p>{data.doctor_name || "-"}</p>
          </div>

          <div className="crm-item">
            <strong>Hospital</strong>
            <p>{data.hospital || "-"}</p>
          </div>

          <div className="crm-item">
            <strong>Product</strong>
            <p>{data.products || "-"}</p>
          </div>

          <div className="crm-item">
            <strong>Outcome</strong>
            <p>{data.outcome || "-"}</p>
          </div>

        </div>

        <div className="summary-card">

          <strong>Meeting Summary</strong>

          <p>{data.summary}</p>

        </div>

        <div className="follow-card">

          <strong>Follow-up Recommendation</strong>

          <p>{data.follow_up}</p>

        </div>

      </div>

    </div>

  );

}