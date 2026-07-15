import "./ChatInput.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Send, Paperclip } from "lucide-react";
import toast from "react-hot-toast";
import { sendChat, userMessage, fetchHistory } from "../../redux/interactionSlice";
import { fetchDashboardStats } from "../../redux/dashboardSlice";
import VoiceButton from "./VoiceButton";
import FilePreview from "./FilePreview";

export default function ChatInput({ value, onChange }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.interaction.loading);
  const [internalInput, setInternalInput] = useState("");
  const [file, setFile] = useState(null);
  const input = value ?? internalInput;
  const setInput = onChange ?? setInternalInput;

  const submit = async () => {
    if (!input.trim() || loading) {
      if (file && !input.trim()) toast.error("Add a message describing the attachment.");
      return;
    }

    if (file) toast("Attachments are displayed locally; the current AI endpoint accepts text only.");
    dispatch(userMessage({ content: input, type: "user", file: file?.name || null, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }));
    const result = await dispatch(sendChat({ message: input }));
    if (sendChat.fulfilled.match(result)) {
      dispatch(fetchHistory());
      dispatch(fetchDashboardStats());
    } else {
      toast.error("AI request failed. Please try again.");
    }
    setInput("");
    setFile(null);
  };

  return (
    <div className="chat-input-wrapper">
      {file && <FilePreview file={file} remove={() => setFile(null)} />}
      <div className="chat-input">
        <label className="upload-btn"><Paperclip size={18} /><input hidden type="file" onChange={(event) => setFile(event.target.files[0] || null)} /></label>
        <input value={input} disabled={loading} placeholder="Ask CRM AI anything..." onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); submit(); } }} />
        <VoiceButton onResult={setInput} />
        <button className="send-button" onClick={submit} disabled={loading} type="button"><Send size={18} /></button>
      </div>
    </div>
  );
}
