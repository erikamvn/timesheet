import React from "react";
import "./ModalMessage.css";
import Modal from "react-modal";
import { HiOutlineExclamation } from "react-icons/hi";
Modal.setAppElement("#root");

const ModalMenssage = ({ title, message, onClose }) => {
  const handleOk = () => {
    onClose();
  };

  return (
    <div>
      {console.log(title)}
      <Modal
        isOpen={true}
        style={{
          content: {
            top: "150px",
            left: "350px",
            right: "350px",
            bottom: "150px",
          },
        }}
      >
        <div className="container">
          <HiOutlineExclamation size={80} />
          <h1>{title}</h1>
          <span>{message}</span>
        </div>
        <div className="button-container">
        <button className="okButton" type="submit" onClick={handleOk}>OK</button>

        </div>
      </Modal>
    </div>
  );
};

export default ModalMenssage;
