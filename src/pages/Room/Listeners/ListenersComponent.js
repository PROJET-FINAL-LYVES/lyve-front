import React, { useState, useEffect } from 'react';

const Listeners = ({ socket, roomId }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Assuming that 'users' is the event to listen for user data
        socket.on('room users', (usernames) => {
            setUsers(usernames);
        });

        // Emit an event to ask for user list when component mounts
        // Assuming that 'get users' is the correct event for this
        socket.emit('get users', roomId);

        // Cleanup function
        return () => {
            socket.off('users');
        };
    }, [roomId, socket]);

    return (
        <div className='rounded-2xl mt-4 bg-lightgray'>
            Listeners:
            {users.map((user, index) => (
                <div key={index}>{user}</div>
            ))}
        </div>
    );
};

export default Listeners;
