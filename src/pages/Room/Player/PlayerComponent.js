import React, { useRef, useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import ReactPlayer from "react-player";
import { AuthContext } from '../../../context/AuthProvider';

function Player({ roomId, isHost, url, onSkipVideo }) {
    const playerRef = useRef();
    const [currentVideo, setCurrentVideo] = useState(url);
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [played, setPlayed] = useState(0);
    const [volume, setVolume] = useState(50);
    const [playerReady, setPlayerReady] = useState(false);
    const { currentUser, login, logout, socket } = useContext(AuthContext);


    useEffect(() => {
        if (!socket) return;
        const handleClientVideoAction = (action, time) => {
            console.log('received video action' + action.type + ' ' + time)
            if (playerRef.current && playerRef.current.getInternalPlayer()) {
                if (action.type === 'play') {
                    playerRef.current.seekTo(time, 'seconds');
                    playerRef.current.getInternalPlayer().playVideo();
                } else if (action.type === 'pause') {
                    playerRef.current.seekTo(time, 'seconds');
                    playerRef.current.getInternalPlayer().pauseVideo();
                }
            } else {
            }
        };

        socket.on('client video action', handleClientVideoAction);

        return () => {
            socket.off('client video action', handleClientVideoAction);
        };
    }, []);

    useEffect(() => {
        if (playerRef.current && playerRef.current.getInternalPlayer()) {

            setPlaying(true);
        }
    }, [currentVideo])

    useEffect(() => {
        if (!socket) return;
        const handleGetCurrentState = (newUserId) => {
            console.log('get current state')
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
                    if (playerState !== null) {
                        socket.emit('send player state', newUserId, currentTime, playerState);
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
        if (!socket) return;
        const handleEditClientPlayerState = (currentTime, playerState) => {
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
                }, 2000);
            }
        };

        socket.on('edit client player state', handleEditClientPlayerState);

        return () => {
            socket.off('edit client player state', handleEditClientPlayerState);
        };
    }, [playerReady]);

    useEffect(() => {
        if (!socket) return;
        const handleSetVideoUrl = (newUrl) => {
            setCurrentVideo(newUrl);
        };

        socket.on('set video url', handleSetVideoUrl);

        return () => {
            socket.off('set video url', handleSetVideoUrl);
        };
    }, [socket]);

    const handlePlayerReady = () => {
        setPlayerReady(true);
    };

    useEffect(() => {
        console.log('url changed', url)
        setCurrentVideo(url);
    }, [url]);

    useEffect(() => {
        if (playerRef.current && playerRef.current.getInternalPlayer()) {
            playerRef.current.getInternalPlayer().setVolume(volume);
        }
    }, [volume]);
    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
    };

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

    return (
        <div className="player rounded-2xl mb-4 bg-opacity-50 bg-gradient-to-t from-fadestart to-fadeend">
            <div className="player_wrapper h-96 p-6">
                <ReactPlayer
                    ref={playerRef}
                    url={currentVideo}
                    controls={true}
                    style={{
                        pointerEvents: isHost ? 'auto' : 'none',
                    }}
                    width='100%'
                    height='100%'
                    key={currentVideo} 
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
            {currentVideo && (
                <div className="flex px-5 w-100 items-center justify-between">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="slider mb-4"
                    />
                    {isHost && <button className="mb-4 bg-gold hover:bg-lightgray hover:text-white transition text-black text-xs font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                        onClick={onSkipVideo}>
                        Video suivante
                    </button>}

                </div>
            )}
        </div>
    );
}

Player.propTypes = {
    roomId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isHost: PropTypes.bool.isRequired,
}

export default Player;
