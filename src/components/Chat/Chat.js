import React, { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

import "./Chat.css";
function Chat() {
  const [lastId, setLastId] = useState(0);
  const [messages, setMessages] = useState([]);
  const refMessage = useRef();
  localStorage.setItem("localUserId", "5f2d9da0-f624-4309-a598-8ba35d6c4bb6");
  const URL = "http://localhost:7778";

  useEffect(() => {
    const interval = setInterval(() => {
      getMessages(lastId);
    }, 5000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="chat-app">
      <div className="chat-window">
        <ul className="chat-messages">
          {messages.map((item) => (
            <li
              key={nanoid()}
              className={
                item.userId === localStorage.getItem("localUserId")
                  ? "message message-local"
                  : "message message-another"
              }
            >
              {item.content}
            </li>
          ))}
        </ul>
      </div>
      <form className="message-form">
        <input className="message-input" ref={refMessage} />
        <button className="message-submit" onClick={sendMessage}>
          Send
        </button>
      </form>
    </div>
  );

  async function getMessages(lastId) {
    fetch(`${URL}/messages?from=${lastId}`)
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp[0]) {
          setMessages((prevMessages) => [...prevMessages, ...resp]);
          setLastId(resp[resp.length - 1].id);
        }
      })
      .catch((err) => console.log(err));
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!refMessage.current.value) return;
    const request = {
      id: 0,
      userId: localStorage.getItem("localUserId"),
      content: refMessage.current.value,
    };
    await fetch(`${URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(request),
    });
    getMessages(lastId);
  }
}

export default Chat;
