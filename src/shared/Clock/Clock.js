import React, { useState, useEffect } from "react";

const Clock = () => {
  const [clockState, setClockState] = useState();

  useEffect(() => {
    let interval = 
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <span>{clockState}</span>
    </div>
  );
};

export default Clock;
