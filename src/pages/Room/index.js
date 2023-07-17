import React, { useEffect, useState } from 'react'
import Chatbox from './Chatbox/ChatboxComponent';
import Player from './Player/PlayerComponent';
import Playlist from './Playlist/PlaylistComponent';
import Listeners from './Listeners/ListenersComponent';
import { useParams } from 'react-router-dom';
import socket from '../../socket';

const Room = () => {
    const { id: roomId } = useParams();
    const [isHost, setIsHost] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [currentVideo, setCurrentVideo] = useState('');


    const handleVideoUrlChange = (event) => {
        setVideoUrl(event.target.value);
    };

    const handleVideoSubmit = (event) => {
        event.preventDefault();
        socket.emit('add video', roomId, videoUrl);
        setVideoUrl('');
    };


    useEffect(() => {
        socket.emit('join room', roomId);
        socket.on('host status', (status) => {
            setIsHost(status);
        });

        socket.on('play video', (videoUrl) => {
            setCurrentVideo(videoUrl);
        });
    }, [roomId]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log(`Connected with id: ${socket.id}`);
        });
    }, []);

    return (
        <div className='room h-app flex'>
            {/* <div className='bg-red-500'>
                <div className="room-id">Room ID: {roomId}</div>
                <div className="host-status">Host: {isHost ? 'Yes' : 'No'}</div>
            </div> */}
            <div className='h-full basis-1/5 flex-shrink min-w-[25%] '>
                <Chatbox roomId={roomId} isHost={isHost} />
            </div>
            <div className='h-full basis-3/5 max-w-5xl py-4 pl-4 flex flex-col'>

                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-2xl font-bold'>Room ID: {roomId}</h2>
                    <div className='flex items-center'>
                        <div className=' text-gold mr-4'>{isHost ? "Vous êtes l'hôte de ce salon" : "Vous n'êtes pas l'hôte de ce salon"}</div>
                    </div>
                </div>

                <Player roomId={roomId} isHost={isHost} url={currentVideo} />

                {/* todo */}
                <div className='rounded-2xl  p-8 bg-lightgray'>
                    <Playlist roomId={roomId} isHost={isHost} />
                    <div>
                        <form onSubmit={handleVideoSubmit} className='playlist-form flex flex-col'>
                            <input className="bg-black p-4 w-2/4 mx-auto border-gold border rounded-0 text-lightgray font-bold text-sm rounded  py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                type="url" value={videoUrl} onChange={handleVideoUrlChange} required />
                            <button type="submit">Ajouter</button>
                        </form>
                    </div>
                </div>


            </div>
            <div className='rounded-2xl w-full min-w-[10%] basis-1/5  m-4 p-8 bg-lightgray'>
                <Listeners roomId={roomId} />
            </div>


        </div>
    );
}

export default Room
