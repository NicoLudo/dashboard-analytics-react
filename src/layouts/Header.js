import React from "react";
import logo from "../assets/img/Header/logo.svg";

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Logo" />
      <p>Accueil</p>
      <p>Profil</p>
      <p>Réglage</p>
      <p>Communauté</p>
    </header>
  );
};

export default Header;
