import "./AIWorkspace.css";

import ChatSidebar from "../components/ai/ChatSidebar";
import ChatWindow from "../components/ai/ChatWindow";

import InteractionForm from "../components/interaction/InteractionForm";
import SummaryPanel from "../components/interaction/SummaryPanel";
import RecommendationPanel from "../components/interaction/RecommendationPanel";
import FormStatusBridge from "../components/interaction/FormStatusBridge";

export default function AIWorkspace() {

    return (

        <div className="ai-workspace">

            <FormStatusBridge />

            <ChatSidebar />

            <div className="workspace-main">

                <ChatWindow />

            </div>

            <div className="workspace-right">

                <InteractionForm />

                <SummaryPanel />

                <RecommendationPanel />

            </div>

        </div>

    );

}