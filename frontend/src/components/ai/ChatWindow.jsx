import "./ChatWindow.css";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import MessageBubble from "./MessageBubble";
import PromptSuggestions from "./PromptSuggestions";
import EmptyState from "./EmptyState";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow() {

    const [draft, setDraft] = useState("");

    const {

        messages,

        loading

    } = useSelector(

        (state) => state.interaction

    );

    const messageEndRef = useRef(null);

    useEffect(() => {

        messageEndRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [messages, loading]);

    const conversation = useMemo(() => {

        return messages.map((message, index) => (

            <MessageBubble

                key={

                    message.id ||

                    `${message.type}-${index}`

                }

                message={message}

            />

        ));

    }, [messages]);

    return (

        <div className="chat-window">

            <div className="chat-window-header">

                <div>

                    <h2>

                        CRM AI Assistant

                    </h2>

                    <span>

                        LangGraph • Gemini • Enterprise Workspace

                    </span>

                </div>

                <div className="assistant-status">

                    <span className="status-dot"></span>

                    Online

                </div>

            </div>

            <div className="messages-container">

                {

                    messages.length === 0 && (

                        <>

                            <EmptyState />

                            <PromptSuggestions onSelect={setDraft} />

                        </>

                    )

                }

                {conversation}

                {

                    loading && (

                        <TypingIndicator />

                    )

                }

                <div ref={messageEndRef} />

            </div>

            <ChatInput value={draft} onChange={setDraft} />

        </div>

    );

}
