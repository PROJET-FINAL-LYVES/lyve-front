import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from '../../../context/AuthProvider';

function Chatbox({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { socket, currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (socket) {
      socket.on('chat message', (messageWithUsername) => {
        setMessages(messages => [...messages, messageWithUsername]);
      });
      socket.on('chat message error', (error) => {
        setErrorMessage(error);
      });
      return () => {
        socket.off('chat message');
        socket.off('chat message error');
      };
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('chat message error', (error) => {
        setErrorMessage(error);
      });
      return () => {
        socket.off('chat message error');
      };
    }
  }, []);


  const el = document.getElementById('chat-feed');
  useEffect(() => {
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const sendMessage = e => {
    e.preventDefault();
    setErrorMessage(null);
    socket.emit('chat message', roomId, input, currentUser.username);
    setInput("");
  };

  return (
    <section className="chatbox-wrapper max-w-96 py-4 px-6 h-full flex flex-col content-between bg-black">
      <h2 className="py-4 font-bold text-2xl text-gold">Chatbox</h2>
      <span id="chat-feed" className="chatbox-content w-100 h-full flex-col-reverse text-start overflow-auto flex-wrap break-words">
        {messages.map((message, i) => (
          <p className="mb-2 w-full block" key={i}>
            {message.username ? `${message.username}: ` : ''}{message.text}
          </p>
        ))}
      </span>
      <form onSubmit={sendMessage}>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <input
          className="bg-black p-4 mt-8 border-gold border rounded-0 text-lightgray font-bold text-sm rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Saisissez votre message"
        />
        <button className="bg-gold text-xs hover:bg-lightgray hover:text-white transition text-black font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          type="submit">Envoyer</button>
      </form>
    </section>
  );
}

export default Chatbox;
