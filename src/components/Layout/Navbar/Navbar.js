import React, { useState, useEffect, useContext } from "react";
import Logo from "../../Logo/Logo";
import { Link } from "react-router-dom";
import { useLoading } from '../../../context/LoadingContext';
import { AuthContext } from '../../../context/AuthProvider';

const Navbar = () => {
  const { currentUser, login, logout, socket } = useContext(AuthContext);
  const { setIsLoading } = useLoading();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("private");
  const [maxUsers, setMaxUsers] = useState(12);
  const MUSIC_TYPES = [
    'jazz',
    'rap',
    'classic',
    'rock',
    'hip-hop',
    'rnb',
    'dnb',
    'house'
  ];


  useEffect(() => {
    if (socket) {
      socket.on('create room', (roomId) => {
      });

      return () => {
        socket.off('create room');
      };
    }
  }, [socket]);


  const [musicType, setMusicType] = useState(MUSIC_TYPES[0]);

  useEffect(() => {
    if (socket) {
      socket.on('create room', (response) => {
        setShowModal(false);
        setIsLoading(false);
      });

      return () => {
        socket.off('create room');
      };
    }
  }, [socket]);

  useEffect(() => {
    console.log("Navbar socket state:", socket ? socket.connected : 'No socket');
  }, [socket]);

  const handleSubmit = (event) => {
    const userId = currentUser._id
    const userName = currentUser.username
    event.preventDefault();
    socket.emit('create room', {
      name,
      userId,
      userName,
      type,
      maxUsers: maxUsers,
      musicType
    }, (ack) => {
      console.log('Server received the CREATE_ROOM_EVENT:', ack);
    });
    return false;
  };


  return (
    <header>
      <nav className="bg-darkestgray h-{menu} bg-opacity-50 mx-auto p-4 flex text-center items-center justify-between font-primary font-light">
        <div className="header-left">
          <Logo />
        </div>

        <div className="header-right flex gap-4">
          {currentUser ? (
            <>
              <button
                onClick={() => setShowModal(true)}
                className="text-white hover:text-gold transition-all"
              >
                Créer une room
              </button>
              <Link to='/admin' className="text-white hover:text-gold transition-all">Administration</Link>
              <Link to='/myaccount' className="text-white hover:text-gold transition-all">Mon Compte</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gold transition-all">
                Connexion
              </Link>
              <Link to="/signup" className="text-white hover:text-gold transition-all">
                Inscription
              </Link>
            </>
          )}
        </div>
      </nav>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black p-7 w-auto mx-auto my-5 text-darkgray rounded-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="text-white absolute top-4 right-4"
            >
              X
            </button>
            <Logo />
            <h2 className="text-white text-2xl font-bold mb-12">
              Créer une room
            </h2>
            <form className="px-8 pt-6 pb-8 mb-4 text-white" onSubmit={handleSubmit}>
              <div className="mb-8">
                <label className="block text-left text-white text-xs font-bold mb-3" htmlFor="name">
                  Nom de la room
                </label>
                <input
                  className="bg-black border-white border text-lightgray font-bold text-sm rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Saisir le nom de la room"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-8">
                <label className="block text-left text-white text-xs font-bold mb-3" htmlFor="type">
                  Type
                </label>
                <select
                  className="bg-black border-white border text-lightgray font-bold text-sm rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="private">Privée</option>
                  <option value="public">Publique</option>
                </select>
              </div>
              <div className="mb-8">
                <label className="block text-left text-white text-xs font-bold mb-3" htmlFor="musicType">
                  Style de musique
                </label>
                <select
                  className="bg-black border-white border text-lightgray font-bold text-sm rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="musicType"
                  value={musicType}
                  onChange={(e) => setMusicType(e.target.value)}
                >
                  {MUSIC_TYPES.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-8">
                <label className="block text-left text-white text-xs font-bold mb-3" htmlFor="maxUsers">
                  Nb maximum de personnes
                </label>
                <input
                  className="bg-black border-white border text-lightgray font-bold text-sm rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="maxUsers"
                  type="number"
                  min="1"
                  max="12"
                  placeholder="Enter Max People Inside"
                  value={maxUsers || ""}
                  onChange={(e) => setMaxUsers(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-gold hover:bg-lightgray hover:text-white transition text-black font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;