import React, { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

import "./Chat.css"
function Chat() {
  const [lastId, setLastId] = useState(0);
  const refMessage = useRef();
  const [messages, setMessages] = useState([
    {
      id: 1,
      userId: "5f2d9da0-f624-4309-a598-8ba35d6c4bb6",
      content: "Какая сейчас погода за окном?",
    },
    {
      id: 2,
      userId: "5f2d9da0-f624-4309-a598-8ba34d6c4bb6",
      content: "К сожалению, я не знаю ответа на этот вопрос",
    },
  ]);
  
  localStorage.setItem("localUserId", "5f2d9da0-f624-4309-a598-8ba35d6c4bb6");

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getMessages(lastId);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);
  
  return (
    <div className="chat-app">
      <div className="chat-window">
        <ul className="chat-messages">
          {messages.map((item) => (
            <li key={nanoid()}
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
        <button className="message-submit" onClick={sendMessage}>Send</button>
      </form>
    </div>
  );

  async function getMessages(lastId) {
    console.log("Это lastId: " + lastId);
    fetch(`http://localhost:7778/messages?from=${lastId}`)
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        console.log("Первый response: " + resp)
        setMessages(prevMessages => [...prevMessages, resp]);
        setLastId(resp[resp.length - 1].id);
      })
      .catch((err) => console.log(err));
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!refMessage.current.value) return;
    const request = {
      id: 0,
      userId: localStorage.getItem("localUserId"),
      content: refMessage.current.value
    }
    await fetch("http://localhost:7778/messages", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(request),
    });
    getMessages(lastId);

  }
}

export default Chat;
