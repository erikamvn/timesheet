const getFormatedActualDate = () => {
  return getFormatedDate(new Date());
};

const getFormatedDate = (date) => {
  let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  let mouth = date.getMonth() + 1;
  let mouthf = mouth > 9 ? mouth : `0${mouth}`;

  return day + "/" + mouthf + "/" + date.getFullYear();
};

const getFormatedHour = (date) => {
  if (date instanceof Date && !isNaN(date)) {
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let hourString = hour < 10? `0${hour}` : hour;
    let minutesString = minutes < 10? `0${minutes}` : minutes;
    let secondsString = seconds < 10? `0${seconds}` : seconds;

    return `${hourString}:${minutesString}:${secondsString}`;
  }

  return null;
};

export { getFormatedActualDate, getFormatedDate, getFormatedHour };
