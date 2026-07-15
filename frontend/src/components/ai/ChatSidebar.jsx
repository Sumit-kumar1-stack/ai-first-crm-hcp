import "./ChatSidebar.css";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Plus, MessageSquare, Pin } from "lucide-react";
import { clearMessages } from "../../redux/interactionSlice";

export default function ChatSidebar() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.interaction.messages);
  const [search, setSearch] = useState("");
  const [pinned, setPinned] = useState(false);
  const chats = useMemo(() => messages.filter((message) => message.type === "user").map((message, index) => ({ id: index, title: message.content })).filter((item) => item.title?.toLowerCase().includes(search.toLowerCase())).slice(-8).reverse(), [messages, search]);
  return <div className="chat-sidebar">
    <button className="new-chat" onClick={() => dispatch(clearMessages())} type="button"><Plus size={18}/><span>New Chat</span></button>
    <div className="chat-search"><Search size={18}/><input type="text" placeholder="Search this conversation..." value={search} onChange={(event) => setSearch(event.target.value)}/></div>
    <div className="chat-history"><div className="group-title">Current conversation</div>{chats.length ? chats.map((chat) => <div key={chat.id} className="history-item"><div className="history-left"><MessageSquare size={16}/><span>{chat.title}</span></div><button className="pin-btn" onClick={() => setPinned(!pinned)} type="button" aria-label="Pin conversation"><Pin size={14} fill={pinned ? "currentColor" : "none"}/></button></div>) : <p>No messages yet.</p>}</div>
  </div>;
}
