import React, { useRef, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import ReactPlayer from "react-player";
import socket from '../../../socket';

function Player({ roomId, isHost, url }) {
    const playerRef = useRef();
    const [currentVideo, setCurrentVideo] = useState(url);
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [played, setPlayed] = useState(0);
    const [playerReady, setPlayerReady] = useState(false);


    useEffect(() => {
        const handleClientVideoAction = (action, time) => {
            console.log('Received video action: ', action, time);
            if (playerRef.current && playerRef.current.getInternalPlayer()) {
                console.log('Player found')
                if (action.type === 'play') {
                    playerRef.current.seekTo(time, 'seconds');
                    playerRef.current.getInternalPlayer().playVideo();
                } else if (action.type === 'pause') {
                    playerRef.current.seekTo(time, 'seconds');
                    playerRef.current.getInternalPlayer().pauseVideo();
                }
            } else {
                console.log('No player found')
            }
        };

        socket.on('client video action', handleClientVideoAction);

        return () => {
            socket.off('client video action', handleClientVideoAction);
        };
    }, []);



    useEffect(() => {
        if (!socket) return;

        const handleGetCurrentState = (newUserId) => {
            console.log('Sending current state to [' + newUserId + ']')
            if (playerRef.current) {
                const currentTime = playerRef.current.getCurrentTime();
                let internalPlayer = playerRef.current.getInternalPlayer();

                if (internalPlayer && typeof internalPlayer.getPlayerState === 'function') {
                    let playerState = internalPlayer.getPlayerState();

                    if (playerState === 1) {
                        playerState = 'playing';
                    } else if (playerState === 2) {
                        playerState = 'paused';
                    }
                    console.log('playerState: ' + playerState)
                    if (playerState !== null) {
                        socket.emit('send player state', newUserId, currentTime, playerState);
                        console.log('Sent current state to [' + newUserId + '] (time: ' + currentTime + ', state: ' + playerState + ')');
                    }
                }
            }
        };
        socket.on('get player state', handleGetCurrentState);
        return () => {
            socket.off('get player state', handleGetCurrentState);
        };
    }, [socket]);

    useEffect(() => {
        const handleEditClientPlayerState = (currentTime, playerState) => {
            // Add .1 seconds to the currentTime
            const updatedCurrentTime = currentTime + 1.5;

            if (playerState === 'playing') {
                playerRef.current.seekTo(updatedCurrentTime, 'seconds');
                setPlaying(true);
                setTimeout(() => {
                    playerRef.current.seekTo(updatedCurrentTime, 'seconds');
                }, 100);
            } else if (playerState === 'paused') {
                setPlaying(true);
                setTimeout(() => {
                    playerRef.current.seekTo(currentTime, 'seconds');
                    setPlaying(false);
                    playerRef.current.getInternalPlayer().pauseVideo();
                }, 1000);
            }
        };

        socket.on('edit client player state', handleEditClientPlayerState);

        return () => {
            socket.off('edit client player state', handleEditClientPlayerState);
        };
    }, [playerReady]);


    const handlePlayerReady = () => {
        setPlayerReady(true);
    };

    useEffect(() => {
        setCurrentVideo(url);
    }, [url]);

    const playVideo = () => {
        if (isHost) {
            const currentTime = playerRef.current.getCurrentTime();
            socket.emit('video action', roomId, { type: 'play', time: currentTime });
        }
    };

    const pauseVideo = () => {
        if (isHost) {
            const currentTime = playerRef.current.getCurrentTime();
            socket.emit('video action', roomId, { type: 'pause', time: currentTime });
        }
    };

    const onEnd = () => {
        if (isHost) {
            socket.emit('next video', roomId);
        }
    };

    const onProgress = state => {
        if (isHost) {
            setPlayed(state.playedSeconds);
        }
    };

    const onDuration = (duration) => {
        if (isHost) {
            setDuration(duration);
        }
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
                    url={currentVideo}
                    controls={true}
                    style={{
                        pointerEvents: isHost ? 'auto' : 'none',
                        width: '100px',
                    }}
                    config={{ youtube: { playerVars: { disablekb: isHost ? 0 : 1 } } }}
                    playing={playing}
                    onPlay={playVideo}
                    onReady={handlePlayerReady}
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
