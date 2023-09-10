import RoomsListItem from './RoomsListItem/RoomsListItem'
import { Link } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider'; // or wherever your socket context is


const RoomsList = () => {
    const [rooms, setRooms] = useState([]);
    const { socket } = useContext(AuthContext); // Replace AuthContext with your actual socket context if different

    useEffect(() => {
        if (socket) {
            // Request initial list of rooms
            socket.emit('fetch_rooms');
            console.log('fetch_rooms')
            // Listen for the initial list of rooms
            socket.on('initial_rooms', (initialRooms) => {
                setRooms(initialRooms);
            });

            // Listen for new room creation
            socket.on('create room', (newRoom) => {

                setRooms(prevRooms => [...prevRooms, newRoom]);
                socket.emit('fetch_rooms');
            });

            return () => {
                socket.off('initial_rooms');
                socket.off('create_room');
            };
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            // Listen for room deletion
            socket.on('delete room', (deletedRoomId) => {
                console.log('delete room')
                setRooms(prevRooms => prevRooms.filter(room => room.roomId !== deletedRoomId));
            });

            return () => {
                socket.off('delete room');
            };
        }
    }, [socket]);

    const handleDelete = (room) => {
        console.log(room)
        // Emit the DELETE_ROOM_EVENT to the server
        socket.emit('delete room',room.roomId);
    };

    return (
        <section className='servers-list max-w-screen-lg mx-auto p-4 mt-20'>
            <h2 className='font-bold text-2xl mb-12'>Rejoignez un serveur</h2>
            <div className='w-100 grid grid-cols-3 gap-16' >
                {rooms.map((room, index) => (
                    // <Link to={`/server/${room.hostId}`} key={index}>
                        <RoomsListItem
                            key={index}
                            name={room.name}
                            room={room}
                            onDelete={handleDelete}
                            // listenersCount={room.userList.length} // Update this based on your real data
                            // nowPlaying={room.musicType} // Update this based on your real data
                        />
                    // </Link>
                ))}
            </div>
        </section>
    );

}

export default RoomsList