import React, { useState, useEffect } from "react";
import "./Timesheet.css";
import Header from "../../shared/Header/Header";
import { getFormatedActualDate } from "../../shared/Utils";
import Clock from "../../shared/Clock/Clock";
import ActionButton from "../../shared/ActionButton/ActionButton";
import * as api from "../../services/timesheetService";
import Timesgrade from "./Timegrade/Timegrade";

const ACTION_BUTTONS = [
  {
    title: "CHEGUEI",
  },
  {
    title: "FUI ALMOÇAR",
  },
  {
    title: "VOLTEI",
  },
  {
    title: "FUI",
  },
];

const Timesheet = () => {
  const [actionButtonState, setActionButtonState] = useState([
    "active",
    "inactive",
    "inactive",
    "inactive",
  ]);

  const [timerOn, setTimerOn] = useState(false);
  const [time, setTime] = useState(0);
  const [allTimes, setAlltimes] = useState([]);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    if (allTimes.length <= 0) {
      getAllTimes();
    }

    return () => clearInterval(interval);
  }, [timerOn, allTimes]);

  const getAllTimes = async () => {
    const res = await api.getTimeList();

    const { items } = res;
    setAlltimes(items);
  };

  const handleActionClick = (id) => {
    let actionButtonLocalState = [...actionButtonState];
    actionButtonLocalState[id] = "inactive";
    let next = id + 1;
    if (ACTION_BUTTONS.length >= next) {
      actionButtonLocalState[next] = "active";
    }

    let newTimerOn = !timerOn;

    switch (id) {
      case 0:
        getNewTime();
        break;

      case 1:
        setLunchTime();
        break;

      case 2:
        setLunchEndTime();
        break;

      case 3:
        setEndTime();
        actionButtonLocalState[0] = "active";
        setTime(0);
        break;

      default:
        console.log("botão não configurado");
    }

    setActionButtonState(actionButtonLocalState);
    setTimerOn(newTimerOn);
  };

  const getNewTime = async () => {
    let res = await api.insertTime();
    let newAllTimes = [...allTimes];
    newAllTimes.unshift(res);

    setCurrentId(res.id);
    setAlltimes(newAllTimes);
  };

  const setLunchTime = () => {
    let newAllTimes = [...allTimes];
    let currentTime = allTimes.find((time) => time.id === currentId);
    currentTime.startLunch = new Date();

    setAlltimes(newAllTimes);
  };

  const setLunchEndTime = () => {
    let newAllTimes = Object.assign([], allTimes);
    let currentTime = allTimes.find((time) => time.id === currentId);
    currentTime.endLunch = new Date();

    setAlltimes(newAllTimes);
  };

  const setEndTime = () => {
    let newAllTimes = Object.assign([], allTimes);
    let currentTime = allTimes.find((time) => time.id === currentId);
    currentTime.end = new Date();

    setAlltimes(newAllTimes);
    api.updateTime(currentTime);
  };

  return (
    <div>
      <Header />
      <div className="info">
        <div>{getFormatedActualDate()}</div>
        <div>
          <Clock />
        </div>
        <div className="stopwatch">
          <span>
            Tempo {("0" + Math.floor((time / (60 * 60 * 1000)) % 60)).slice(-2)}
            :
          </span>
          <span>
            {("0" + Math.floor((time / (60 * 1000)) % 60)).slice(-2)}:
          </span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        </div>
      </div>
      <div className="action-painel">
        {ACTION_BUTTONS.map((b, index) => {
          return (
            <ActionButton
              title={b.title}
              status={actionButtonState[index]}
              id={index}
              key={index}
              onActionClick={handleActionClick}
            />
          );
        })}
      </div>
      <div className="container-grade">
        <Timesgrade times={allTimes} />
      </div>
    </div>
  );
};

export default Timesheet;
