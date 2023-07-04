import React, { useEffect, useState } from 'react'
import Chatbox from './Chatbox/ChatboxComponent';
import Player from './Player/PlayerComponent';
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
            <Player roomId={roomId} isHost={isHost} url="https://soundcloud.com/samstr/holy-key?si=bdf80baacf8040b58a42a3de0ed7f4f8&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" />
        </div>
    );
}

export default Room
