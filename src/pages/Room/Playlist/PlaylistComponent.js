import React, { useEffect } from 'react';

function Playlist({ playlist, isHost, videoUrl, handleVideoUrlChange, handleVideoSubmit, handleClearPlaylist }) {

    useEffect(() => {
        console.log(playlist)
    }, [playlist])
    return (
        <div className=''>
            A suivre
            <div className='following-wrapper flex overflow-x-auto gap-4 w-5/6'>
                {
                    playlist.map((song, index) => (
                        <span key={index} className='following rounded-2xl w-32 h-32 bg-custom-gray p-8'>
                            {song}
                        </span>
                    ))
                }
            </div>
            <button onClick={handleClearPlaylist}>Clear Playlist</button>
            <div>
                <form onSubmit={handleVideoSubmit} className='playlist-form flex flex-col'>
                    <input className="bg-black p-4 w-2/4 mx-auto border-gold border rounded-0 text-lightgray font-bold text-sm rounded  py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="url" value={videoUrl} onChange={handleVideoUrlChange} required />
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        </div>
    );
}

export default Playlist;
