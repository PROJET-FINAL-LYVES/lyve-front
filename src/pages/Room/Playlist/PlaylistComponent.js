import React from 'react';

function Playlist({ playlist }) {
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
        </div>
    );
}

export default Playlist;
