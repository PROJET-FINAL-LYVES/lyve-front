import React, { useRef } from "react";
import PropTypes from 'prop-types';
import ReactPlayer from "react-player";
import useSocket from '../../../hooks/useSocket';
import socket from '../../../socket';

function Player({ roomId, url, isHost }) {
    const playerRef = useRef();

    useSocket(roomId, isHost, playerRef);

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

    return (
        <ReactPlayer
            ref={playerRef}
            url={url}
            controls={true}
            style={{ pointerEvents: isHost ? 'auto' : 'none' }}
            disablekb={isHost ? false : true}
            autoplay={true}
            onPlay={playVideo}
            onPause={pauseVideo}
        />
    );
}

Player.propTypes = {
    roomId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isHost: PropTypes.bool.isRequired,
}

export default Player;
