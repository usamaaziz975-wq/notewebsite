import { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  onSnapshot
} from "firebase/firestore";

import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../style.css";

export default function Home() {
  const nav = useNavigate();

  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [text, setText] = useState("");
  const [color, setColor] = useState("#fff9c4");
  const [textColor, setTextColor] = useState("#000");
  const [font, setFont] = useState("Arial");

  const [editId, setEditId] = useState(null);

  // AUTH
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) nav("/");
      else setUser(u);
      setLoading(false);
    });

    return () => unsub();
  }, [nav]);

  // LOAD NOTES
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "notes"), where("uid", "==", user.uid));

    const unsub = onSnapshot(q, (snap) => {
      setNotes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [user]);

  // SAVE / UPDATE
  const saveNote = async () => {
    if (!text.trim()) return;

    if (editId) {
      await updateDoc(doc(db, "notes", editId), {
        text,
        color,
        textColor,
        font
      });

      setEditId(null);
      setText("");
      return;
    }

    await addDoc(collection(db, "notes"), {
      text,
      color,
      textColor,
      font,
      uid: user.uid,
      createdAt: Date.now()
    });

    setText("");
  };

  // EDIT
  const startEdit = (n) => {
    setText(n.text);
    setColor(n.color);
    setTextColor(n.textColor);
    setFont(n.font);
    setEditId(n.id);
  };

  // DELETE
  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  // LOGOUT
  const logout = async () => {
    await signOut(auth);
    nav("/");
  };

  if (loading) return null;

  return (
    <div className="home">

      {/* TOP BAR */}
      <div className="topbar">
        <h2>📒 My Notes Board</h2>
        <button className="logout" onClick={logout}>Logout</button>
      </div>

      {/* INPUT SECTION */}
      <div className="note-input">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your note..."
        />

        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="#fff9c4">🟡 Note Color: Yellow</option>
          <option value="#ffcdd2">🔴 Note Color: Red</option>
          <option value="#bbdefb">🔵 Note Color: Blue</option>
          <option value="#c8e6c9">🟢 Note Color: Green</option>
          <option value="#f8bbd0">🌸 Note Color: Pink</option>
        </select>

        <select value={textColor} onChange={(e) => setTextColor(e.target.value)}>
          <option value="#000">⚫ Text Color: Black</option>
          <option value="#fff">⚪ Text Color: White</option>
          <option value="#e11d48">🔴 Red</option>
          <option value="#2563eb">🔵 Blue</option>
          <option value="#16a34a">🟢 Green</option>
          <option value="#a855f7">🟣 Purple</option>
          <option value="#f97316">🟠 Orange</option>
        </select>

        <select value={font} onChange={(e) => setFont(e.target.value)}>
  <option value="Arial" style={{ fontFamily: "Arial" }}>Arial</option>
  <option value="Georgia" style={{ fontFamily: "Georgia" }}>Georgia</option>
  <option value="Times New Roman" style={{ fontFamily: "Times New Roman" }}>
    Times New Roman
  </option>
  <option value="Verdana" style={{ fontFamily: "Verdana" }}>Verdana</option>
  <option value="Tahoma" style={{ fontFamily: "Tahoma" }}>Tahoma</option>
  <option value="Courier New" style={{ fontFamily: "Courier New" }}>
    Courier New
  </option>
  <option value="Comic Sans MS" style={{ fontFamily: "Comic Sans MS" }}>
    Comic Sans
  </option>
  <option value="Impact" style={{ fontFamily: "Impact" }}>Impact</option>
</select>

        <button onClick={saveNote}>
          {editId ? "Update Note" : "Add Note"}
        </button>

      </div>

      {/* NOTES */}
      <div className="notes-grid">
        {notes.map((n) => (
          <div
            key={n.id}
            className="note-card"
            style={{
              background: n.color,
              color: n.textColor,
              fontFamily: n.font
            }}
          >
            <p>{n.text}</p>

            <div className="note-buttons">
              <button className="edit-btn" onClick={() => startEdit(n)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteNote(n.id)}>Delete</button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}