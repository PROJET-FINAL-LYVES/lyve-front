import React, { useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import socket from '../../../socket';

function Player({ roomId, url, isHost }) {

    const playerRef = useRef();

    useEffect(() => {
        if (isHost) {
            alert('You are now the host');
        }
    }, [isHost]);

    const playVideo = () => {
        if (isHost) {
            const currentTime = playerRef.current.getCurrentTime();
            console.log('Play Video: ', currentTime);
            socket.emit('video action', roomId, { type: 'play', time: currentTime });
        }
    };

    const pauseVideo = () => {
        if (isHost) {
            const currentTime = playerRef.current.getCurrentTime();
            console.log('Pause Video: ', currentTime);
            socket.emit('video action', roomId, { type: 'pause', time: currentTime });
        }
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
            style={{pointerEvents : isHost ? 'auto' : 'none'}}
            disablekb = {isHost ? false : true}
            autoplay={true}
            onPlay={playVideo}
            onPause={pauseVideo}
        />
    );
}

export default Player;
