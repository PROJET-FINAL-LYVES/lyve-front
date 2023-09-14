import React from 'react';

function Playlist({ playlist, isHost, videoUrl, handleVideoUrlChange, handleVideoSubmit, handleClearPlaylist, handleRemoveSong, currentUser }) {
    return (
        <div>
            <span className='font-bold text-2xl text-gold'>A suivre</span>
            <div className='following-wrapper flex overflow-x-auto gap-4 w-5/6'>
                {
                    playlist.map((song, index) => (
                        <span key={index} className='following rounded-2xl w-24 h-content bg-custom-gray break-all p-4'>
                            <div className='text-xs'>
                                {song.name} <br />
                                <span className='text-gold'>
                                    {song.duration.hours}h {song.duration.minutes}m {song.duration.seconds}s <br />
                                </span>
                                {/* Display username of the person who posted the song */}
                                <span className='text-gray-500'>
                                    
                                    {song.username}
                                    </span>
                            </div>
                            <div className='text-red-500'>
                                {/* Check if the current user is the host or the one who added the song */}
                                {index !== 0 && (isHost || (currentUser && currentUser._id === song.userId)) && <button onClick={() => handleRemoveSong(index)}>X</button>}
                            </div>
                        </span>
                    ))
                }

            </div>
            {isHost &&
                <button onClick={handleClearPlaylist}>Vider la playlist</button>
            }
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
