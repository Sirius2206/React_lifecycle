import React, { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";

import "./CRUD.css";

function CRUD() {
  const [notes, setNotes] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await fetch("http://localhost:7777/notes")
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        setNotes(resp);
      })
      .catch((err) => console.log(err));
  }

  async function postData(e) {
    e.preventDefault();
    if (!ref.current.value) return;
    const request = { id: 0, content: ref.current.value };
    await fetch("http://localhost:7777/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(request),
    });
    ref.current.value = '';
    getData();
  }

  async function deleteNote(item) {
    await fetch(`http://localhost:7777/notes/${item.id}`, { method: "DELETE" });
    getData();
  }

  return (
    <div>
      <header className="header">
      <h1>Notes</h1>
      <button onClick={getData} className="btn btn-refresh">Refresh</button>
      </header>
      <div className="notes-block">
        {notes.map((item) => (
            <div className="notes-element" key={nanoid()}>
              <p>{item.content}</p>
              <button className="btn btn-delete" onClick={() => deleteNote(item)}>X</button>
            </div>
        ))}
      </div>

      <div className="block-input">
        <textarea className="user-input" ref={ref}></textarea>
        <button onClick={postData} className="btn btn-send">Send</button>
      </div>
    </div>
  );
}

export default CRUD;
