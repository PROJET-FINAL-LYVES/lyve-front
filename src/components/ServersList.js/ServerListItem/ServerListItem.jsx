import React from 'react';
import PropTypes from 'prop-types';

const ServerListItem = ({ name, description, imageUrl, listenersCount, nowPlaying }) => {

    const randomColor = () => {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };

    const bgColor = randomColor();

    return (
        <div className="rounded-2xl bg-custom-gray overflow-hidden">
            <div className="server-top w-full h-48 rounded-b-2xl relative" style={{ backgroundColor: bgColor }}>
                <div className="server-image w-5/6 h-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cover bg-center rounded-2xl" style={{ backgroundImage: `url(${imageUrl})` }} />
            </div>
            <div className="server-bottom w-full p-4 text-left">
                <h3 className="font-bold text-xl mb-2">{name}</h3>
                <p className="text-xs text-gray-200 mb-4">{description}</p>
                <p className="text-sm text-white mb-4">{listenersCount} personnes sur le dancefloor</p>
                <p className="text-sm text-white ">{nowPlaying}</p>
            </div>
        </div>
    );
};

ServerListItem.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    listenersCount: PropTypes.number.isRequired,
    nowPlaying: PropTypes.string.isRequired,
};

export default ServerListItem;
