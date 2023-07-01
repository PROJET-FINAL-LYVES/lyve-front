import React, { useRef } from "react";
import ReactPlayer from "react-player";

import { useEffect } from "react";
import socket from '../../../socket';

function YouTubePlayer({ roomId, url }) {
    
    const playerRef = useRef();

    const playVideo = () => {
        const currentTime = playerRef.current.getCurrentTime();
        console.log('Play Video: ', currentTime);
        socket.emit('video action', roomId, { type: 'play', time: currentTime });
    };

    const pauseVideo = () => {
        const currentTime = playerRef.current.getCurrentTime();
        console.log('Pause Video: ', currentTime);
        socket.emit('video action', roomId, { type: 'pause', time: currentTime });
    };



    useEffect(() => {
        socket.on('video action', (action, time) => {
            console.log('Received video action: ', action, time);
            if (action.type === 'play') {
                playerRef.current.seekTo(time, 'seconds');
                playerRef.current.getInternalPlayer().playVideo();
            } else if (action.type === 'pause') {
                playerRef.current.seekTo(time, 'seconds');
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
