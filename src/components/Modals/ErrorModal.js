import { useNavigate } from 'react-router-dom';

const ErrorModal = ({ message, onClose }) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        onClose();
        navigate('/'); 
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Error</h2>
                <p>{message}</p>
                <button onClick={handleRedirect}>Retour à l'accueil</button>
            </div>
        </div>
    );
};
