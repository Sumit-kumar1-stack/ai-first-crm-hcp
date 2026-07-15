import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  sendChat,
  userMessage,
  fetchHistory,
} from "../../redux/interactionSlice";

import {
  fetchDashboardStats,
} from "../../redux/dashboardSlice";

import "./ChatPanel.css";

export default function ChatPanel() {

  const dispatch = useDispatch();

  const { messages, loading } = useSelector(
    (state) => state.interaction
  );

  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({

      behavior: "smooth",

    });

  }, [messages, loading]);

  const suggestions = [

    "Log a meeting with Dr. Sharma at Apollo Hospital for CardioX.",

    "Search interactions with Dr. Sharma.",

    "Summarize my latest doctor interactions.",

    "Recommend follow-up actions for pending meetings.",

  ];

  const send = async () => {

    if (!input.trim() || loading) return;

    dispatch(userMessage(input));

    await dispatch(sendChat(input));

    dispatch(fetchHistory());

    dispatch(fetchDashboardStats());

    setInput("");

  };

  return (

    <div className="chat-card">

      <div className="chat-header">

        <div>

          <h2>

            AI CRM Assistant

          </h2>

          <p>

            Ask questions, log interactions and search records using natural language.

          </p>

        </div>

        <div className="assistant-status">

          <span className="status-dot"></span>

          Online

        </div>

      </div>

      <div className="chat-box">

        {

          messages.length === 0 && (

            <div className="empty-chat">

              <div className="robot">

                🤖

              </div>

              <h3>

                Welcome to AI CRM Assistant

              </h3>

              <p>

                I can help you manage doctor interactions using natural language.

              </p>

              <div className="suggestions">

                {

                  suggestions.map((item, index) => (

                    <button

                      key={index}

                      className="suggestion-btn"

                      onClick={() => setInput(item)}

                    >

                      {item}

                    </button>

                  ))

                }

              </div>

            </div>

          )

        }

        {

          messages.map((message, index) => {

            if (message.type === "user") {

              return (

                <div

                  key={index}

                  className="user-message"

                >

                  <div className="user-bubble">

                    <div>

                      {message.content}

                    </div>

                    <small>

                      {message.time || ""}

                    </small>

                  </div>

                </div>

              );

            }

            const intent = message.intent;

            const data = message.data || {};

            return (

              <div

                key={index}

                className="ai-message"

              >

                <div className="avatar">

                  🤖

                </div>

                <div className="ai-bubble">

                  <div className="ai-top">

                    <h4>

                      AI CRM Assistant

                    </h4>

                    <span className="intent-badge">

                      {(intent || "AI").toUpperCase()}

                    </span>

                  </div>

                  <div className="success">

                    {message.message}

                  </div>

                  {/* ---------- AI RESPONSE CARDS START HERE ---------- */}

                                    {/* ==========================
                      LOG
                  ========================== */}

                  {intent === "log" && (

                    <div className="crm-card">

                      <div className="crm-row">
                        <strong>Doctor</strong>
                        <span>{data.doctor_name || "-"}</span>
                      </div>

                      <div className="crm-row">
                        <strong>Hospital</strong>
                        <span>{data.hospital || "-"}</span>
                      </div>

                      <div className="crm-row">
                        <strong>Specialization</strong>
                        <span>{data.specialization || "-"}</span>
                      </div>

                      <div className="crm-row">
                        <strong>Meeting Date</strong>
                        <span>{data.meeting_date || "-"}</span>
                      </div>

                      <div className="crm-row">
                        <strong>Product</strong>
                        <span>{data.products || "-"}</span>
                      </div>

                      <div className="crm-row">
                        <strong>Status</strong>
                        <span>{data.outcome || "Pending"}</span>
                      </div>

                      <div className="summary-box">

                        <h5>Summary</h5>

                        <p>

                          {data.summary || "-"}

                        </p>

                      </div>

                      <div className="follow-box">

                        <h5>Follow-up</h5>

                        <p>

                          {data.follow_up || "-"}

                        </p>

                      </div>

                    </div>

                  )}

                  {/* ==========================
                      SEARCH
                  ========================== */}

                  {intent === "search" && (

                    <div>

                      <h4 className="section-title">

                        Search Results

                      </h4>

                      {

                        Array.isArray(data) && data.length > 0 ? (

                          data.map((item) => (

                            <div

                              key={item.id}

                              className="search-card"

                            >

                              <h4>

                                {item.doctor_name}

                              </h4>

                              <p>

                                <strong>Hospital:</strong>{" "}

                                {item.hospital || "-"}

                              </p>

                              <p>

                                <strong>Product:</strong>{" "}

                                {item.products || "-"}

                              </p>

                              <p>

                                <strong>Meeting:</strong>{" "}

                                {item.meeting_date || "-"}

                              </p>

                              <p>

                                <strong>Summary:</strong>{" "}

                                {item.summary || "-"}

                              </p>

                            </div>

                          ))

                        ) : (

                          <div className="empty-search">

                            No matching interactions found.

                          </div>

                        )

                      }

                    </div>

                  )}

                  {/* ==========================
                      SUMMARY
                  ========================== */}

                  {intent === "summary" && (

                    <div className="summary-box">

                      <h5>

                        AI Generated Summary

                      </h5>

                      <p>

                        {data.summary || message.message}

                      </p>

                    </div>

                  )}

                  {/* ==========================
                      FOLLOWUP
                  ========================== */}

                  {intent === "followup" && (

                    <div className="follow-box">

                      <h5>

                        Recommended Follow-up

                      </h5>

                      <p>

                        {

                          data.recommendation ||

                          message.message

                        }

                      </p>

                    </div>

                  )}

                  {/* ==========================
                      EDIT
                  ========================== */}

                  {intent === "edit" && (

                    <div className="crm-card success-card">

                      <h5>

                        Interaction Updated

                      </h5>

                      <p>

                        {message.message}

                      </p>

                    </div>

                  )}

                  <small className="message-time">

                    {message.time || ""}

                  </small>

                </div>

              </div>

            );

          })

        }

        {

          loading && (

            <div className="ai-message">

              <div className="avatar">

                🤖

              </div>

              <div className="ai-bubble">

                <div className="typing-indicator">

                  <span></span>

                  <span></span>

                  <span></span>

                </div>

              </div>

            </div>

          )

        }

        <div ref={messagesEndRef}></div>

      </div>

      <div className="chat-input">

        <input

          className="chat-textbox"

          value={input}

          disabled={loading}

          placeholder="Describe your interaction or ask anything..."

          onChange={(e) =>

            setInput(e.target.value)

          }

          onKeyDown={(e) => {

            if (

              e.key === "Enter" &&

              !e.shiftKey

            ) {

              e.preventDefault();

              send();

            }

          }}

        />

        <button

          onClick={send}

          disabled={loading}

        >

          {

            loading

              ? "Thinking..."

              : "Send"

          }

        </button>

      </div>

    </div>

  );

}