import { useEffect } from "react";
import socket from '../socket';

const useSocket = (roomId, isHost, playerRef) => {
    // eslint-disable-next-line
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
}

export default useSocket;
