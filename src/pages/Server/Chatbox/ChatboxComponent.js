import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:3001";  // Change this to your server's URL

const ChatBoxComponent = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  // Connect to the server when the component mounts
  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log("Connected");
    });

    newSocket.on('chat message', msg => {
      setMessages(messages => [...messages, msg]);
    });

    // Disconnect the socket when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = e => {
    e.preventDefault();

    // Send the message to the server
    if (socket) {
      socket.emit('chat message', message);
    }

    // Clear the input field
    setMessage('');
  };

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBoxComponent;
