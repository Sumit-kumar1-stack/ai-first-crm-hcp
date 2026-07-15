import "./AIInsightsPanel.css";

export default function ConfidenceBadge({

    confidence = 0,

}) {

    const percentage =
  confidence <= 1
    ? Math.round(confidence * 100)
    : Math.round(confidence);

    return (

        <div className="confidence-badge">

            <span className="confidence-dot"></span>

            AI Confidence

            <strong>

                {percentage}%

            </strong>

        </div>

    );

}