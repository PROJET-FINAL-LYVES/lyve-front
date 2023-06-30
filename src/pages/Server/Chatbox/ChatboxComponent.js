import React, { useEffect, useState } from "react";

import socket from '../../../socket';

function Chatbox({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {

    socket.emit('join room', roomId);

    socket.on('chat message', msg => {
      setMessages(messages => [...messages, msg]);
    });
    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = e => {
    e.preventDefault();
    socket.emit('chat message', roomId, input);
    setInput("");
  };

  return (
    <div>
      {messages.map((message, i) => (
        <p key={i}>{message}</p>
      ))}
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbox;
