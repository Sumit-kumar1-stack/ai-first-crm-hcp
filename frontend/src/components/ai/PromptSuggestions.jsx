import "./PromptSuggestions.css";

const prompts = [
  "Log today's doctor meeting",
  "Summarize my Apollo visits",
  "Show pending follow-ups",
  "Search Dr. Sharma",
  "Generate CRM insights",
];

export default function PromptSuggestions({ onSelect }) {
  return (
    <div className="prompt-list">
      {prompts.map((prompt, index) => (
        <button
          key={index}
          className="prompt"
          onClick={() => onSelect?.(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
