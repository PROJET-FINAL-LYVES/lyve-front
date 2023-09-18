import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { Link } from "react-router-dom";

const RoomsListItem = ({
  name,
  description,
  imageUrl,
  nowPlaying,
  onDelete,
  room,
}) => {
  const { currentUser } = useContext(AuthContext);
  const numberOfUsers = room.userList ? room.userList.length : 0;
  const isPrivate = room.type === "private" ? 'text-gold' : " ";
  return (
    <div className="rounded-2xl bg-custom-gray overflow-hidden border-gold border-2">
      {/* <div className="server-top w-full h-48 rounded-b-2xl relative bg-gray-300">
        <div
          className="server-image w-5/6 h-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cover bg-center rounded-2xl"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div> */}
      <div className="server-bottom w-full p-4 text-left">
        <Link className={isPrivate} to={`/room/${room.roomId}`}>
          <h3 className="font-bold text-xl mb-2">{name}</h3>
        </Link>
        <p className="text-xs text-gray-200 mb-4">{description}</p>
        <p className="text-sm text-white mb-4">
          <strong>ID :</strong> {room.roomId}
        </p>
        <p className="text-sm text-white mb-4">
          <strong>Nombre d'utilisateurs :</strong> {numberOfUsers}
        </p>
        <p className="text-sm text-white mb-4">
          <strong>Créateur : </strong>
          {room.hostName}
        </p>
        <p className="text-sm text-white mb-4">
          <strong>Type de musique :</strong> {room.musicType}
        </p>
        <p className="text-sm text-white mb-4">
          <strong>Date de création :</strong>{" "}
          {new Date(room.creationDate).toLocaleString()}
        </p>
        {currentUser.username === room.hostName && (
          <button
            className="bg-red-500 text-xs text-white rounded mt-4 p-2"
            onClick={() => onDelete(room)}>
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
};

RoomsListItem.propTypes = {
  //   name: PropTypes.string. isRequired,
  // description: PropTypes.string.isRequired,
  // imageUrl: PropTypes.string.isRequired,
  //   listenersCount: PropTypes.number.isRequired,
  //   nowPlaying: PropTypes.string.isRequired,
};

export default RoomsListItem;
