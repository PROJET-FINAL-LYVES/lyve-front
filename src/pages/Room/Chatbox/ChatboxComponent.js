import React, { useEffect, useState } from "react";

import socket from '../../../socket';

function Chatbox({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on('chat message', msg => {
      setMessages(messages => [...messages, msg]);
    });
    return () => {
      socket.off('chat message');
    };
  }, []);

  const el = document.getElementById('chat-feed');
  // id of the chat container ---------- ^^^
  useEffect(() => {

    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const sendMessage = e => {
    e.preventDefault();
    socket.emit('chat message', roomId, input);
    setInput("");
  };

  return (
    <section className="chatbox-wrapper max-w-96 py-4 px-8 h-full flex flex-col content-between bg-black">
      <h2 className="py-4">Chatbox</h2>
      <span id="chat-feed" className="chatbox-content w-100 h-full flex-col-reverse text-start overflow-auto flex-wrap break-words">
        {messages.map((message, i) => (
          <p className="mb-2 w-full block" key={i}>{message}</p>
        ))}
      </span>
      <form onSubmit={sendMessage}>
        <input
          className="bg-black p-4 mt-8 border-gold border rounded-0 text-lightgray font-bold text-sm rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Envoyer</button>
      </form>
    </section>
  );
}

export default Chatbox;
