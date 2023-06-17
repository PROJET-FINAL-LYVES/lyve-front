import React from 'react'
import ServerListItem from './ServerListItem/ServerListItem'

const ServersList = () => {
    const servers = [
        {
            id: 1,
            name: 'Server 1',
            description: 'Lorem ipsum',
            imageUrl: 'https://placehold.it/200x200',
            listenersCount: 23,
            nowPlaying: 'Macklemore - Thrift Shop'
        },
        {
            id: 2,
            name: 'Server 2',
            description: 'Lorem ipsum',
            imageUrl: 'https://placehold.it/200x200',
            listenersCount: 10,
            nowPlaying: 'Migos - Bad and Boujee'
        },
        {
            id: 3,
            name: 'Server 3',
            description: 'Lorem ipsum',
            imageUrl: 'https://placehold.it/200x200',
            listenersCount: 5,
            nowPlaying: 'Abel31 - 7 Rings'
        },
        {
            id: 4,
            name: 'Server 4',
            description: 'Lorem ipsum',
            imageUrl: 'https://placehold.it/200x200',
            listenersCount: 2,
            nowPlaying: 'Patryk Polonais - 7 Rings'
        },
        {
            id: 5,
            name: 'Server 5',
            description: 'Lorem ipsum',
            imageUrl: 'https://placehold.it/200x200',
            listenersCount: 1,
            nowPlaying: 'Macklemore - Thrift Shop'
        },

        {
            id: 6,
            name: 'Server 6',
            description: 'Lorem ipsum',
            imageUrl: 'https://placehold.it/200x200',
            listenersCount: 23,
            nowPlaying: 'Macklemore - Thrift Shop'
        },
        {
            id: 7,
            name: 'Server 7',
            description: 'Lorem ipsum',
            imageUrl: 'https://placehold.it/200x200',
            listenersCount: 10,
            nowPlaying: 'Migos - Bad and Boujee'
        },
        {
            id: 8,

            name: 'Server 8',
            description: 'Lorem ipsum',
            imageUrl: 'https://placehold.it/200x200',
            listenersCount: 5,
            nowPlaying: 'Abel31 - 7 Rings'
        },
        {
            id: 9,
            name: 'Server 9',
            description: 'Lorem ipsum',
            imageUrl: 'https://placehold.it/200x200',
            listenersCount: 2,

            nowPlaying: 'Patryk Polonais - 7 Rings'
        },
        {
            id: 10,
            name: 'Server 10',
            description: 'Lorem ipsum',
            imageUrl: 'https://placehold.it/200x200',
            listenersCount: 1,
            nowPlaying: 'Macklemore - Thrift Shop'
        },
    ]
    return (
        <section className='servers-list max-w-screen-lg mx-auto p-4 mt-20'>
            <h2 className='font-bold text-2xl mb-12'>Rejoignez un serveur</h2>
            <div className='w-100 grid grid-cols-3 gap-16' >
                {servers.map(server => (
                    <ServerListItem
                        key={server.id}
                        name={server.name}
                        description={server.description}
                        imageUrl={server.imageUrl}
                        listenersCount={server.listenersCount}
                        nowPlaying={server.nowPlaying}
                    />
                ))}
            </div>
        </section>
    )
}

export default ServersList