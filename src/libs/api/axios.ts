import axios from "axios";

const baseaxios = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/9-2",
});
// 요청 인터셉터
baseaxios.interceptors.request.use(
  (config) => {
    const tokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="));
    if (tokenCookie) {
      const token = tokenCookie.split("=")[1];
      if (token) {
        if (!config.headers) {
          config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// 응답 인터셉터
baseaxios.interceptors.response.use(
  function (response) {
    // 응답 200번대 status일 때 응답 성공 직전 호출
    // 3. 이 작업 이후 .then()으로 이어진다
    return response;
  },
  function (error) {
    // 응답 200번대가 아닌 status일 때 응답 에러 직전 호출
    // 4. 이 작업 이후 .catch()로 이어진다
    return Promise.reject(error);
  },
);

export default baseaxios;
