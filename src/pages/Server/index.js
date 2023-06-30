import React from 'react'

import Chatbox from './Chatbox/ChatboxComponent';
import YoutubePlayer from './YoutubePlayer/YoutubePlayerComponent';

import { useParams } from 'react-router-dom';


function Room({roomId = 1 }) {
    return (
        <div>
            <Chatbox roomId={roomId} />
            <YoutubePlayer roomId={roomId} url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
        </div>
    );
}

export default Room;