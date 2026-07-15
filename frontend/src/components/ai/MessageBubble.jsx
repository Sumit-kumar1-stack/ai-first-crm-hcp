import "./MessageBubble.css";

import { useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  Bot,
  User,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Copy,
  Check,
} from "lucide-react";

export default function MessageBubble({
  message,
  onRegenerate,
}) {
  const [copied, setCopied] = useState(false);

  const isUser = message.type === "user";

  // Always provide a string to ReactMarkdown
  const text =
    typeof message.content === "string"
      ? message.content
      : typeof message.message === "string"
        ? message.message
        : JSON.stringify(
            message.content || message.message || "",
            null,
            2
          );

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`message-row ${
        isUser ? "user" : "assistant"
      }`}
    >
      <div className="avatar">
        {isUser ? (
          <User size={18} />
        ) : (
          <Bot size={18} />
        )}
      </div>

      <div className="message-card">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({
              inline,
              className,
              children,
              ...props
            }) {
              const match =
                /language-(\w+)/.exec(
                  className || ""
                );

              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(
                    /\n$/,
                    ""
                  )}
                </SyntaxHighlighter>
              ) : (
                <code
                  className={className}
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {text}
        </ReactMarkdown>

        {!isUser && (
          <div className="message-actions">
            <button
              onClick={copyMessage}
              title="Copy"
            >
              {copied ? (
                <Check size={16} />
              ) : (
                <Copy size={16} />
              )}
            </button>

            <button title="Helpful">
              <ThumbsUp size={16} />
            </button>

            <button title="Not Helpful">
              <ThumbsDown size={16} />
            </button>

            <button
              title="Regenerate"
              onClick={() => onRegenerate?.()}
            >
              <RotateCcw size={16} />
            </button>
          </div>
        )}

        <div className="time">
          {message.time ||
            new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </div>
      </div>
    </div>
  );
}