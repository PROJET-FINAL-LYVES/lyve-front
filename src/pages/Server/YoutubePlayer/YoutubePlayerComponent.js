import React, { useRef } from "react";
import ReactPlayer from "react-player";

import { useEffect } from "react";
import socket from '../../../socket';

function YouTubePlayer({ roomId, url }) {
    const playerRef = useRef();

    const playVideo = () => {
        console.log('play')
        socket.emit('video action', roomId, { type: 'play' });
    };

    const pauseVideo = () => {
        socket.emit('video action', roomId, { type: 'pause' });
    };

    useEffect(() => {
        socket.on('video action', (action) => {
            if (action.type === 'play') {
                console.log('play')
                playerRef.current.getInternalPlayer().playVideo();
            } else if (action.type === 'pause') {
                console.log('pause')
                playerRef.current.getInternalPlayer().pauseVideo();
            }
        });
    }, []);

    return (
        <ReactPlayer
            ref={playerRef}
            url={url}
            controls={true}
            onPlay={playVideo}
            onPause={pauseVideo}
        />
    );
}



export default YouTubePlayer;
