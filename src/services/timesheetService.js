import api from "./api";
const API_URL = "Timesheet";

const insertTime = async () => {
  const res = await api.post(API_URL);
  return res.data;
};

const getTimeList = async () => {
  const res = await api.get(API_URL);
  return res.data;
};

const updateTime = async (time) => {
  const url = API_URL + "/" + time.id;
  await api.put(url, time);
};

export { insertTime, getTimeList, updateTime };
