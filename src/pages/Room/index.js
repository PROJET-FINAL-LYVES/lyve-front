import React, { useEffect, useState, useContext } from 'react';
import Chatbox from './Chatbox/ChatboxComponent';
import Player from './Player/PlayerComponent';
import Playlist from './Playlist/PlaylistComponent';
import Listeners from './Listeners/ListenersComponent';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';


const Room = () => {
    const { id: roomId } = useParams();
    const [isHost, setIsHost] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [currentVideo, setCurrentVideo] = useState('');
    const [playlist, setPlaylist] = useState([]);
    const { currentUser, login, logout, socket } = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);


    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            setShowLoginModal(true);
            navigate('/login');

        }
    }, [currentUser]);

    useEffect(() => {
        return () => {
            if (!socket) return;
            socket.emit('leave room v2', roomId);
        };
    }, [location.pathname, roomId]); 

    const handleClearPlaylist = () => {
        socket.emit('clear playlist', roomId);
    };

    const handleVideoUrlChange = (event) => {
        setVideoUrl(event.target.value);
    };

    const handleVideoSubmit = (event) => {
        event.preventDefault();
        socket.emit('add video v2', roomId, videoUrl);
        setVideoUrl('');
    };

    const handleRemoveSong = (songIndex) => {
        socket.emit('remove song v2', roomId, songIndex, currentUser._id);
    };

    const handleSkipVideo = () => {
        socket.emit('next video', roomId);
    };

    const closeModal = () => {
        setShowErrorModal(false);
        window.location.href = '/';
    };

    useEffect(() => {
        if (socket) {
            socket.emit('join room v2', roomId, currentUser._id);
            socket.on('join room v2', (response) => {
                if (response.message) {
                    setErrorMsg(response.message);
                    setShowErrorModal(true);
                }
            });
    
            socket.on('host status', (status) => {
                console.log('Received HOST_STATUS_EVENT:', status);
                setIsHost(status);
            });
    
            socket.emit('get video url', roomId);
    
            socket.on('set video url', (videoUrl) => {
                setCurrentVideo(videoUrl);
            });
            socket.on('update playlist', (newPlaylist) => {
                setPlaylist(newPlaylist);
            });
            return () => {
                socket.off('host status');
                socket.off('set video url');
                socket.off('update playlist');
            };
        }
    }, [roomId, socket]);

    useEffect(() => {
        if (!socket) return;

        const handleSetVideoUrl = (videoUrl) => {
            setCurrentVideo(videoUrl);
        };

        socket.on('set video url', handleSetVideoUrl);

        return () => {
            socket.off('set video url', handleSetVideoUrl);
        };
    }, [socket, roomId]);  

    useEffect(() => {
        if(socket) {
            socket.on('connect', () => {
                console.log(`Connected with id: ${socket.id}`);
            });
        }
    }, []);

    return (
        <div className='room flex'>
            {showErrorModal && <ErrorModal message={errorMsg} onClose={closeModal} />}
            <div className='basis-1/5 flex-shrink min-w-[25%] '>
                <Chatbox roomId={roomId} isHost={isHost} />
            </div>
            <div className='h-full basis-3/5 max-w-5xl py-4 pl-4 flex flex-col'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-bold'>Room ID: {roomId}</h2>
                    <div className='flex items-center'>
                        <div className=' text-gold text-sm mr-4'>{isHost ? "Vous êtes l'hôte de ce salon" : "Vous n'êtes pas l'hôte de ce salon"}</div>
                    </div>
                </div>
                {!currentVideo && (
                    <div className='text-sm font-bold text-gold'>
                        Aucune vidéo n'est en cours de lecture
                    </div>
                )}
                <Player roomId={roomId} isHost={isHost} url={currentVideo} onSkipVideo={handleSkipVideo} />

                <div className='rounded-2xl  p-6 pt-4 bg-lightgray'>
                    <Playlist
                        roomId={roomId}
                        isHost={isHost}
                        playlist={playlist}
                        videoUrl={videoUrl}
                        handleVideoUrlChange={handleVideoUrlChange}
                        handleVideoSubmit={handleVideoSubmit}
                        handleClearPlaylist={handleClearPlaylist}
                        handleRemoveSong={handleRemoveSong}
                        currentUser={currentUser}
                    />
                </div>
            </div>
            <div className='rounded-2xl w-full min-w-[10%] basis-1/5  m-4 p-4 bg-lightgray'>
                <Listeners roomId={roomId} socket={socket} isHost={isHost} />
            </div>
        </div>
    );
}

const ErrorModal = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black p-7 w-auto mx-auto my-5 text-darkgray rounded-2xl relative">
                <button
                    onClick={onClose}
                    className="text-white absolute top-4 right-4"
                >
                    X
                </button>
                <h2 className="text-white text-2xl font-bold mb-12">
                    Erreur
                </h2>
                <p className="text-white">{message}</p>
                <div className="flex items-center justify-center mt-8">
                    <button
                        onClick={onClose}
                        className="bg-gold hover:bg-lightgray hover:text-white transition text-black font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Room;
