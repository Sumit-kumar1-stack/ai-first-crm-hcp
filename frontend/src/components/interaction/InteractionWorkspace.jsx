import "./InteractionWorkspace.css";

import ChatWindow from "../chat/ChatWindow";
import InteractionHeader from "./InteractionHeader";
import InteractionForm from "./InteractionForm";
import SummaryPanel from "./SummaryPanel";
import RecommendationPanel from "./RecommendationPanel";

export default function InteractionWorkspace() {
  return (
    <div className="interaction-workspace">

      <InteractionHeader />

      <div className="interaction-grid">

        <section className="chat-section">
          <ChatWindow />
        </section>

        <aside className="details-section">

          <InteractionForm />

          <SummaryPanel />

          <RecommendationPanel />

        </aside>

      </div>

    </div>
  );
}