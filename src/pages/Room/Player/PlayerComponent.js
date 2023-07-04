import React, { useRef, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import ReactPlayer from "react-player";
import useSocket from '../../../hooks/useSocket';
import socket from '../../../socket';

function Player({ roomId, url, isHost }) {
    const playerRef = useRef();
    const [currentVideo, setCurrentVideo] = useState(url);
    const [playing, setPlaying] = useState(false);

    useSocket(roomId, isHost, playerRef);

    useEffect(() => {
        // Lorsqu'une nouvelle vidéo est définie, la lecture commence automatiquement
        setPlaying(true);
    }, [currentVideo]);

    const playVideo = () => {
        const currentTime = playerRef.current.getCurrentTime();
        console.log('Play Video: ', currentTime);
        socket.emit('video action', roomId, { type: 'play', time: currentTime });
    };

    const pauseVideo = () => {
        if (isHost) {
            const currentTime = playerRef.current.getCurrentTime();
            console.log('Pause Video: ', currentTime);
            socket.emit('video action', roomId, { type: 'pause', time: currentTime });
        }
    };

    socket.on('play video', (videoUrl) => {
        setCurrentVideo(videoUrl);
    });

    const onEnd = () => {
        console.log('Video ended');
        socket.emit('next video', roomId);
    };

    return (
        <ReactPlayer
            ref={playerRef}
            url={currentVideo}
            controls={true}
            style={{ pointerEvents: isHost ? 'auto' : 'none' }}
            config={{ youtube: { playerVars: { disablekb: isHost ? 0 : 1 } } }}
            playing={playing}
            onPlay={playVideo}
            onPause={pauseVideo}
            onEnded={onEnd}
        />
    );
}

Player.propTypes = {
    roomId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isHost: PropTypes.bool.isRequired,
}

export default Player;
