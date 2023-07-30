import React, { useState, useEffect } from 'react';

const Listeners = ({ socket, roomId }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on('room users', (usernames) => {
            console.log('Received users: ', usernames);
            setUsers(usernames);
        });
        
        socket.emit('get users', roomId);

        return () => {
            socket.off('room users');
        };
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
            {users.map((user, index) => (
                <div className='text-xs' key={index} style={{ color: getRandomColor() }}>{user}</div>
            ))}
        </div>
    );
};

export default Listeners;
