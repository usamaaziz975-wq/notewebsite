import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../style.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      nav("/");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card slide-up">

        <h2>Create Account 🚀</h2>
        <p className="subtitle">Join us today</p>

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

        <button className="auth-btn" onClick={register}>
          Register
        </button>

        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={() => nav("/")}>Login</span>
        </p>

      </div>
    </div>
  );
}