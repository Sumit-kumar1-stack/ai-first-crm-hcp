import LoginForm from "../components/auth/LoginForm";
import "./Login.css";

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-left">
        <div className="overlay">
          <h1>MedCRM AI</h1>

          <p>
            AI Powered Healthcare CRM
          </p>

          <ul>
            <li>✔ Doctor Interaction Logging</li>
            <li>✔ AI Summaries</li>
            <li>✔ Follow-up Recommendations</li>
            <li>✔ LangGraph + Gemini</li>
          </ul>
        </div>
      </div>

      <div className="login-right">
        <LoginForm />
      </div>
    </div>
  );
}