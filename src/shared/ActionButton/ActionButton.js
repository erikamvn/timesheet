import React from "react";
import "./ActionButton.css";

const ActionButton = ({ onActionClick, title, id, status }) => {
  const handleClick = () => {
    if (status === "active") {
      onActionClick(id);
    }
  };

  return (
    <div>
      <button type="submit" className={status} onClick={handleClick}>
        {title}
      </button>
    </div>
  );
};

export default ActionButton;
