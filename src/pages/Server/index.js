import React from 'react'
import SimpleButton from "../../components/Buttons/SimpleButton";
import Loader from '../../components/Loader/Loader'

import ChatboxComponent from './Chatbox/ChatboxComponent';
import YoutubePlayerComponent from './YoutubePlayer/YoutubePlayerComponent';

import { useParams } from 'react-router-dom';


const ServerComponent = () => {
    const { serverId } = useParams(); // Extract serverId from the URL params

    return (
        <div className="bg-black p-7 w-auto mx-auto my-5 text-darkgray rounded-2xl">

            <ChatboxComponent />
            <YoutubePlayerComponent />
                
        </div>
    )
}

export default ServerComponent