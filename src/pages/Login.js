import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../style.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav("/home");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card fade-in">

        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue</p>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="auth-btn" onClick={login}>
          Login
        </button>

        <p className="switch-text">
          Don’t have an account?{" "}
          <span onClick={() => nav("/register")}>Register</span>
        </p>

      </div>
    </div>
  );
}