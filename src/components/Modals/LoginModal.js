const LoginModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black p-7 w-auto mx-auto my-5 text-darkgray rounded-2xl relative">
                <button
                    onClick={onClose}
                    className="text-white absolute top-4 right-3"
                >
                    
                </button>
                <h2 className="text-white text-2xl font-bold mb-12">
                    Pour continuer, veuillez vous connecter
                </h2>
                <div className="flex items-center justify-center mt-8">
                    <a
                        href="/login"
                        className="bg-gold hover:bg-lightgray hover:text-white transition text-black font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
                    >
                        Se connecter
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;