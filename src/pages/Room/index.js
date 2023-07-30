import React, { useEffect, useState } from 'react';
import Chatbox from './Chatbox/ChatboxComponent';
import Player from './Player/PlayerComponent';
import Playlist from './Playlist/PlaylistComponent';
import Listeners from './Listeners/ListenersComponent';
import { useParams } from 'react-router-dom';
import socket from '../../socket';

const Room = () => {
    const { id: roomId } = useParams();
    const [isHost, setIsHost] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [currentVideo, setCurrentVideo] = useState('');
    const [playlist, setPlaylist] = useState([]);

    const handleClearPlaylist = () => {
        socket.emit('clear playlist', roomId);
    };

    const handleVideoUrlChange = (event) => {
        setVideoUrl(event.target.value);
    };

    const handleVideoSubmit = (event) => {
        event.preventDefault();
        socket.emit('add video', roomId, videoUrl);
        setVideoUrl('');
    };

    useEffect(() => {
        socket.emit('join room', roomId);
        socket.on('host status', (status) => {
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
    }, [socket, roomId]);  // Add roomId as a dependency



    useEffect(() => {
        socket.on('connect', () => {
            console.log(`Connected with id: ${socket.id}`);
        });
    }, []);

    return (
        <div className='room flex'>
            <div className='basis-1/5 flex-shrink min-w-[25%] '>
                <Chatbox roomId={roomId} isHost={isHost} />
            </div>
            <div className='h-full basis-3/5 max-w-5xl py-4 pl-4 flex flex-col'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-2xl font-bold'>Room ID: {roomId}</h2>
                    <div className='flex items-center'>
                        <div className=' text-gold mr-4'>{isHost ? "Vous êtes l'hôte de ce salon" : "Vous n'êtes pas l'hôte de ce salon"}</div>
                    </div>
                </div>
                {!videoUrl && (
                    <div className='text-sm font-bold text-gold'>
                        Aucune vidéo n'est en cours de lecture
                    </div>
                )}
                <Player roomId={roomId} isHost={isHost} url={currentVideo} />

                <div className='rounded-2xl  p-8 bg-lightgray'>
                    <Playlist
                        roomId={roomId}
                        isHost={isHost}
                        playlist={playlist}
                        videoUrl={videoUrl}
                        handleVideoUrlChange={handleVideoUrlChange}
                        handleVideoSubmit={handleVideoSubmit}
                        handleClearPlaylist={handleClearPlaylist}
                    />
                </div>
            </div>
            <div className='rounded-2xl w-full min-w-[10%] basis-1/5  m-4 p-8 bg-lightgray'>
                {/* Pass socket as a prop to the Listeners component */}
                <Listeners roomId={roomId} socket={socket} />
            </div>
        </div>
    );
}

export default Room;
