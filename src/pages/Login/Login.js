import React, { useState } from "react";
import "./Login.css";
import { BiUserCircle } from "react-icons/bi";
import { HiKey } from "react-icons/hi";
import { executeLogin } from "../../services/loginService";
import { useHistory } from 'react-router-dom';
import ModalMenssage from "../../shared/ModalMessage/ModalMessage";


const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();

  const handleLoginClick = async () => {
    const sucess = await executeLogin(login, password);
    if(sucess){
      history.push("/timesheet");
    }else{
      setIsModalOpen(true);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="login">
        
      <div className="login-form">
        <div className="login-field">
          <BiUserCircle size={30} />
          <input
            type="text"
            placeholder="Usuário"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="login-field">
          <HiKey size={30} />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button className="action-button" type="submit" onClick={handleLoginClick}>
            LOGIN
          </button>
        </div>
      </div>
      {isModalOpen && <ModalMenssage title="Erro no login" message="Favor verificar usuário e senha." onClose={handleClose}/>}
    </div>
  );
};

export default Login;
