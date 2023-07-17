import React, { useRef, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import ReactPlayer from "react-player";
import useSocket from '../../../hooks/useSocket';
import socket from '../../../socket';

function Player({ roomId, url, isHost }) {
    const playerRef = useRef();
    const [currentVideo, setCurrentVideo] = useState(url);
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [played, setPlayed] = useState(0);
    const [title, setTitle] = useState('');

    useSocket(roomId, isHost, playerRef);

    useEffect(() => {
        socket.on('set current time', (currentTime) => {
            // Met à jour le temps de la vidéo avec le temps courant envoyé par l'hôte.
            playerRef.current.seekTo(currentTime);
        });
    }, []);
    // Lorsque l'hôte reçoit une demande pour obtenir le temps courant de la vidéo, 
    // il obtient ce temps et l'envoie au nouvel utilisateur.
    socket.on('get current time', (newUserId) => {
        const currentTime = playerRef.current.getCurrentTime();
        socket.emit('send current time', newUserId, currentTime);
    });


    useEffect(() => {
        // Récupérer le titre de la vidéo en utilisant l'API Youtube
        // (à remplacer par une véritable demande à l'API)
        setPlaying(true);
    }, [currentVideo]);

    const playVideo = () => {
        const currentTime = playerRef.current.getCurrentTime();
        socket.emit('video action', roomId, { type: 'play', time: currentTime });
    };

    const pauseVideo = () => {
        if (isHost) {
            const currentTime = playerRef.current.getCurrentTime();
            socket.emit('video action', roomId, { type: 'pause', time: currentTime });
        }
    };

    const onEnd = () => {
        socket.emit('next video', roomId);
    };

    const onProgress = state => {
        // On met à jour le temps joué
        setPlayed(state.playedSeconds);
    };

    const onDuration = (duration) => {
        setDuration(duration);
    };

    const formatTime = (seconds) => {
        const s = Math.ceil(seconds);
        const m = Math.floor(s / 60);
        const remainingS = s % 60;
        return `${m.toString().padStart(2, '0')}:${remainingS.toString().padStart(2, '0')}`;
    };

    return (
        <div className="player rounded-2xl mb-4 bg-opacity-50 bg-gradient-to-t from-fadestart to-fadeend">
            <div className="player_wrapper p-8">
                <ReactPlayer
                    ref={playerRef}
                    url='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                    controls={true}
                    style={{ 
                        pointerEvents: isHost ? 'auto' : 'none',
                        width: '100px',                    
                    }}
                    config={{ youtube: { playerVars: { disablekb: isHost ? 0 : 1 } } }}
                    playing={playing}
                    onPlay={playVideo}
                    onPause={pauseVideo}
                    onEnded={onEnd}
                    onProgress={onProgress}
                    onDuration={onDuration}
                />
            </div>
            {/* <div>
                <div style={{ background: 'grey', height: '10px', width: '100%', position: 'relative' }}>
                    <div style={{ background: 'gold', height: '100%', width: `${(played / duration) * 100}%` }} />
                </div>
                <div>{`${formatTime(played)} / ${formatTime(duration)}`}</div>
            </div> */}
        </div>
    );
}

Player.propTypes = {
    roomId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isHost: PropTypes.bool.isRequired,
}

export default Player;
