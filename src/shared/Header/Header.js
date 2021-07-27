import React, { useEffect, useState } from "react";
import "./Header.css";
import { CgCloseO } from "react-icons/cg";
import { useHistory } from 'react-router-dom';

const Header = () => {
    const [usuarioLogado, setUsuarioLogado] = useState('');
    const history = useHistory();

    useEffect(() => {
      setUsuarioLogado(localStorage.getItem("usuarioLogado"));
    },[])

    const handleLogoutClick = () => {
      localStorage.removeItem("usuarioLogado");
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      history.push("/");
    };

  return (
    <div className="timesheet-container">
      <div className="title">
        <h1>Olá, {usuarioLogado}!</h1>
      </div>
      <div className="logout" onClick={handleLogoutClick}>
          <CgCloseO size={30}/>
      </div>
    </div>
  );
};

export default Header;
