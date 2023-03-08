import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>Bienvenu sur Lyve 😀</h1>
      <h2>Nouveau sur Lyve ?</h2>
      <Link to="/signup">Créer un compte</Link>
      <h2>Déjà inscrit Lyve ?</h2>
      <Link to="/login">Se connecter</Link>
    </div>
  );
};

export default Landing;

