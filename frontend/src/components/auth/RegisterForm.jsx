import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../../services/authApi";
import "./RegisterForm.css";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!form.full_name.trim()) {
      setError("Full name is required");
      return;
    }

    if (!form.email.trim()) {
      setError("Email is required");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await registerUser({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      toast.success("Registration Successful");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form
        className="register-card"
        onSubmit={submit}
      >
        <h1>MedCRM</h1>
        <p>Create your account</p>

        <input
          type="text"
          placeholder="Full Name"
          value={form.full_name}
          onChange={(e) =>
            setForm({
              ...form,
              full_name: e.target.value,
            })
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          minLength={8}
          required
        />

        {error && (
          <div className="error">
            {typeof error === "string"
              ? error
              : JSON.stringify(error)}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading
            ? "Creating..."
            : "Register"}
        </button>

        <Link
          className="login-link"
          to="/login"
        >
          Already have an account?
        </Link>
      </form>
    </div>
  );
}