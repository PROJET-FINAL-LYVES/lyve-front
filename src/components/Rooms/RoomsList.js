import RoomsListItem from './RoomsListItem/RoomsListItem'
import { Link } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';


const RoomsList = () => {
    const [rooms, setRooms] = useState([]);
    const { socket, currentUser } = useContext(AuthContext); 
    useEffect(() => {
        if (socket) {
            socket.emit('fetch_rooms');

            socket.on('initial_rooms', (initialRooms) => {
                setRooms(initialRooms);
            });

            socket.on('create room', (newRoom) => {
                setRooms(prevRooms => [...prevRooms, newRoom]);
                socket.emit('fetch_rooms');
            });

            socket.on('update room', (updatedRoom) => {
                setRooms(prevRooms => {
                    const updatedRooms = prevRooms.map(room => room.roomId === updatedRoom.roomId ? updatedRoom : room);
                    return updatedRooms;
                });
            });

            socket.on('delete room', (deletedRoomId) => {
                setRooms(prevRooms => prevRooms.filter(room => room.roomId !== deletedRoomId));
            });

            return () => {
                socket.off('initial_rooms');
                socket.off('create_room');
                socket.off('update room');
                socket.off('delete room');
            };
        }
    }, [socket]);


    const handleDelete = (room) => {
        socket.emit('delete room',room.roomId);
    };

    return (
        <section className='servers-list max-w-screen-lg mx-auto p-4 mt-20'>
            <h2 className='font-bold text-2xl mb-12'>Rejoignez une room</h2>
            {currentUser ? (
                <div className='w-100 grid grid-cols-3 gap-16'>
                    {rooms.length > 0 ? (
                        rooms
                            .filter(room => {
                                if (room.type !== 'private') return true;

                                return room.hostId === currentUser._id;
                            })
                            .map((room, index) => (
                                <RoomsListItem
                                    key={index}
                                    name={room.name}
                                    room={room}
                                    onDelete={handleDelete}
                                />
                            ))
                    ) : (
                        <div className="col-span-3">
                            <p>Aucune room n'est actuellement en ligne, créez la vôtre dès maintenant !</p>
                        </div>
                    )}

                </div>
            ) : (
                <p>Vous devez être connecté pour afficher les serveurs</p>
            )}
        </section>
    );

}

export default RoomsList