import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import "./Chat.css";

export default function ChatBox() {

  const { messages, loading } = useSelector(
    state => state.interaction
  );

  return (

    <div className="chat-card">

      <h2>AI Conversation</h2>

      <div className="chat-window">

        {messages.length === 0 && (

          <div className="empty-chat">

            Ask the AI to log or edit an HCP interaction.

          </div>

        )}

        {messages.map((msg, index) => (

          <ChatMessage

            key={index}

            message={msg}

          />

        ))}

        {loading && (

          <div className="typing">

            AI Assistant is thinking...

          </div>

        )}

      </div>

      <ChatInput />

    </div>

  );

}