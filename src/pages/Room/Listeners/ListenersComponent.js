import React, { useState, useEffect } from 'react';

const Listeners = ({ socket, roomId, isHost }) => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        if (socket) {
            socket.on('room users', (usernames) => {
                setUsers(usernames);
            });

            socket.emit('get users', roomId);

            return () => {
                socket.off('room users');
            };
        }
    }, [roomId, socket]);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    return (
        <div className='rounded-2xl bg-lightgray'>
            <div className='font-bold text-2xl text-gold mb-4'>
                Participants
            </div>
            {Array.isArray(users) ? (
                users.map((user, index) => (
                    <div className='text-sm' key={index} style={{ color: getRandomColor() }}>{user.username}</div>
                ))
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};

export default Listeners;
