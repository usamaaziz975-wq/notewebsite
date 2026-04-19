import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import "../Auth.css";

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  // LOGIN
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav("/home");
    } catch (e) {
      alert(e.message);
    }
  };

  // REGISTER
  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      nav("/home");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="auth-wrapper">

      <div className={`auth-box ${isRegister ? "right" : "left"}`}>

        {/* LOGIN */}
        <div className="panel login">
          <h2>Login</h2>

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login}>Login</button>

          <p onClick={() => setIsRegister(true)}>
            Create Account →
          </p>
        </div>

        {/* REGISTER */}
        <div className="panel register">
          <h2>Register</h2>

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={register}>Register</button>

          <p onClick={() => setIsRegister(false)}>
            ← Back to Login
          </p>
        </div>

      </div>
    </div>
  );
}