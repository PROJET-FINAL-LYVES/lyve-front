import React, { useState, useEffect } from 'react';
import { Popover } from '@headlessui/react';

const Listeners = ({ socket, roomId, isHost }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleKickUser = (userIdToKick) => {
        socket.emit('kick user', userIdToKick, roomId);
        setSelectedUser(null);
    };

    const handleChangeHost = (newHostId) => {
        socket.emit('change host', newHostId, roomId);
        setSelectedUser(null); 
    };

    
    useEffect(() => {
        if (socket) {
            socket.on('room users', (usernames) => {
                setUsers(usernames);
            });

            return () => {
                socket.off('room users');
            };
        }
    }, [roomId, socket]);

    const getRandomColor = () => {
            const min = 180; 
            const max = 256; 

            const r = Math.floor(Math.random() * (max - min) + min).toString(16);
            const g = Math.floor(Math.random() * (max - min) + min).toString(16);
            const b = Math.floor(Math.random() * (max - min) + min).toString(16);

            const color = `#${r}${g}${b}`;

        return color;
    };
    return (
        <div className='rounded-2xl bg-lightgray'>
            <div className='font-bold text-2xl text-gold mb-4'>
                Participants
            </div>
            {Array.isArray(users) ? (
                users.map((user, index) => (
                    <div key={index} className='text-md' style={{ color: getRandomColor() }}>
                        {isHost ? (
                            <Popover className="relative inline-block text-left">
                                <Popover.Button>
                                    {user.username}
                                </Popover.Button>
                                <Popover.Panel className="absolute z-10 mt-2 w-fit break- p-2 border bg-darkgray border-gray-300 rounded shadow-lg">
                                    <button onClick={() => handleChangeHost(user.id)}>Hôte</button>
                                    <button onClick={() => handleKickUser(user.id)}>Exclure</button>
                                </Popover.Panel>
                            </Popover>
                        ) : (
                            <span className='text-md'>{user.username}</span>
                        )}
                    </div>
                ))
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};

export default Listeners;
