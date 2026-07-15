import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./RegisterForm.css";

export default function RegisterForm() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    role: "MR",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const submit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      await axios.post(
        "http://127.0.0.1:8000/auth/register",
        form
      );

      alert("Registration Successful");

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
          placeholder="Full Name"
          value={form.full_name}
          onChange={(e)=>
            setForm({
              ...form,
              full_name:e.target.value
            })
          }
        />

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e)=>
            setForm({
              ...form,
              username:e.target.value
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e)=>
            setForm({
              ...form,
              email:e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e)=>
            setForm({
              ...form,
              password:e.target.value
            })
          }
        />

        <select
          value={form.role}
          onChange={(e)=>
            setForm({
              ...form,
              role:e.target.value
            })
          }
        >
          <option>MR</option>
          <option>Manager</option>
          <option>Admin</option>
        </select>

        {error &&

          <div className="error">

            {typeof error==="string"
              ? error
              : JSON.stringify(error)}

          </div>

        }

        <button>

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