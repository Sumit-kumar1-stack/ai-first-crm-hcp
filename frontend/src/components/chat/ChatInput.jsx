import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  sendChat,
  userMessage,
  fetchHistory
} from "../../redux/interactionSlice";

export default function ChatInput() {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Add user's message to chat
    dispatch(userMessage(message));

await dispatch(sendChat(message));

dispatch(fetchHistory());

setMessage("");
  };

  return (
    <form onSubmit={submit} className="chat-input">
      <input
        value={message}
        placeholder="Example: I met Dr. Sharma today at Apollo Hospital and discussed CardioX."
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit">
        Send
      </button>
    </form>
  );
}