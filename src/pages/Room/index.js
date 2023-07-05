import React, { useEffect, useState } from 'react'
import Chatbox from './Chatbox/ChatboxComponent';
import Player from './Player/PlayerComponent';
import Playlist from './Playlist/PlaylistComponent';
import { useParams } from 'react-router-dom';
import socket from '../../socket';

const Room = () => {
    const { id: roomId } = useParams();
    const [isHost, setIsHost] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [currentVideo, setCurrentVideo] = useState('');


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

        socket.on('play video', (videoUrl) => {
            setCurrentVideo(videoUrl);
        });
    }, [roomId]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log(`Connected with id: ${socket.id}`);
        });
    }, []);

    return (
        <div>
            <div className='bg-red-500'>
                <div className="room-id">Room ID: {roomId}</div>
                <div className="host-status">Host: {isHost ? 'Yes' : 'No'}</div>
            </div>

            <Chatbox roomId={roomId} isHost={isHost} />
            <Player roomId={roomId} isHost={isHost} url={currentVideo} />
            <Playlist roomId={roomId} isHost={isHost} />
            <form onSubmit={handleVideoSubmit}>
                <input type="url" value={videoUrl} onChange={handleVideoUrlChange} required />
                <button type="submit">Ajouter une vidéo à la playlist</button>
            </form>
        </div>
    );
}

export default Room
