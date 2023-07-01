import React, { useEffect } from 'react'

import Chatbox from './Chatbox/ChatboxComponent';
import YoutubePlayer from './YoutubePlayer/YoutubePlayerComponent';

import { useParams } from 'react-router-dom';
import socket from '../../socket';

function Room() {
    const { id: roomId } = useParams();

    useEffect(() => {
        socket.emit('join room', roomId);
    }, [roomId]);

    // Utilisez le hook useParams pour obtenir l'ID de la room à partir de l'URL

    return (
        <div>
            <Chatbox roomId={roomId} />
            <YoutubePlayer roomId={roomId} url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
        </div>
    );
}

export default Room
