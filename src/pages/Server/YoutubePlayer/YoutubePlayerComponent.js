import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import io from 'socket.io-client';

const YouTubePlayer = ({ videoId = "pWIweATIc94" }) => {
    const playerRef = useRef();
    const [socket, setSocket] = useState(null);
    const [playState, setPlayState] = useState('paused');
    const [playerReady, setPlayerReady] = useState(false); // New state to check if the player is ready

    const startNewVideo = (newVideoId) => {
        if (socket) {
            console.log('start video', newVideoId);
            socket.emit('start video', newVideoId);
        }
    };

    console.log('videoId', videoId)
    useEffect(() => {
        const newSocket = io('http://127.0.0.1:3001');
        setSocket(newSocket);
        newSocket.on('connect', () => {
            console.log("Connected");
            startNewVideo('newVideoId');
        });
        newSocket.on('new video', ({ videoId, startTime }) => {
            console.log('new video', videoId, startTime);
            if (playerReady && playerRef.current && playerRef.current.getIframe()) {
                const currentTime = new Date();
                const timeElapsed = Math.floor((currentTime - new Date(startTime)) / 1000);

                playerRef.current.seekTo(timeElapsed);
                playerRef.current.playVideo();
            }
        });



        return () => {
            newSocket.close();
        };
    }, [playerReady]);



    return (
        <div>

            <YouTube
                ref={playerRef}
                videoId={videoId}
                opts={{
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                        disablekb: 1,
                        fs: 0,
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0,
                    },
                }}
                onReady={(event) => {
                    setPlayerReady(true); // Set playerReady to true when the player is ready
                    playerRef.current = event.target; // Set the playerRef to the YouTube player instance
                }}
            />

            <button onClick={() => startNewVideo('pWIweATIc94')}>Start new video</button>
        </div>
    );
};

export default YouTubePlayer;
