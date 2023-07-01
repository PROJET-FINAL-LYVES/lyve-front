import React, { useEffect, useState } from 'react'
import Chatbox from './Chatbox/ChatboxComponent';
import YoutubePlayer from './YoutubePlayer/YoutubePlayerComponent';
import { useParams } from 'react-router-dom';
import socket from '../../socket';

function Room() {
    const { id: roomId } = useParams();
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {
        socket.emit('join room', roomId);
        socket.on('host status', (status) => {
            setIsHost(status);
        });
    }, [roomId]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log(`Connected with id: ${socket.id}`);
        });
    }, []);

    return (
        <div>
            <Chatbox roomId={roomId} isHost={isHost} />
            <YoutubePlayer roomId={roomId} isHost={isHost} url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
        </div>
    );
}

export default Room
