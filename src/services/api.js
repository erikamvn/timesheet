import axios from "axios";

const api = axios.create({
  baseURL: "http://theraponto.dev.thera.com.br:8088/api",
});

api.interceptors.request.use(async (config) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (err) {
    console.log(err);
  }
});

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.status === 401) {
      localStorage.removeItem("usuarioLogado");
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");

      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
