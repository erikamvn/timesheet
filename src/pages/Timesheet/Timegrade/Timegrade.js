import React from "react";
import "./Timegrade.css";
import { getFormatedDate, getFormatedHour } from "../../../shared/Utils";

const Timegrade = ({ times }) => {
  const calculeTotalHours = (start, startLaunch, endLaunch, end) => {
    if (end === undefined) {
      return null;
    }

    let dStart = new Date(start);
    let dEnd = new Date(end);
    let time = 0;
    if (startLaunch === undefined || endLaunch === undefined) {
      time = dEnd - dStart;
    } else {
      let dLunchStart = new Date(startLaunch);
      let dEndLaunch = new Date(endLaunch);

      time = dEnd - dStart - (dEndLaunch - dLunchStart);
    }
    let hour = ("0" + Math.floor((time / (60 * 60 * 1000)) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((time / (60 * 1000)) % 60)).slice(-2);
    let seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);

    return `${hour}:${minutes}:${seconds}`;
  };

  if (times.length > 0) {
    return (
      <table className="times-table">
        <thead>
          <tr>
            <th style={{ width: "150px" }}>DATA</th>
            <th style={{ width: "150px" }}>HORA INÍCIO</th>
            <th style={{ width: "150px" }}>ALMOÇO INÍCIO</th>
            <th style={{ width: "150px" }}>ALMOÇO FIM</th>
            <th style={{ width: "150px" }}>HORA FIM</th>
            <th style={{ width: "150px" }}>TEMPO</th>
          </tr>
        </thead>
        <tbody>
          {times.map((time) => {
            const { id, start, startLunch, endLunch, end } = time;
            return (
              <tr className="row-time" key={id}>
                <td>{getFormatedDate(new Date(start))}</td>
                <td>{getFormatedHour(new Date(start))}</td>
                <td>{getFormatedHour(new Date(startLunch))}</td>
                <td>{getFormatedHour(new Date(endLunch))}</td>
                <td>{getFormatedHour(new Date(end))}</td>
                <td>{calculeTotalHours(start, startLunch, endLunch, end)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );

  } else {
    return <div>Nenhum dado encontrado.</div>;
  }
};

export default Timegrade;
