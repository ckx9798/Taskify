import axios, { AxiosHeaders } from "axios";

const baseaxios = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/9-2",
});

export const setToken = (token: string | undefined) => {
  baseaxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

baseaxios.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
      // headers가 undefined일 경우 빈 객체로 초기화
    }
    // Node.js 환경에서 쿠키를 가져옵니다.
    if (typeof window === "undefined") {
      const tokenCookie = config.headers.cookie;
      console.log(tokenCookie);
      if (tokenCookie) {
        const token = tokenCookie
          .split("; ")
          .find((row: string) => row.startsWith("accessToken="))
          ?.split("=")[1];
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } else {
      // 브라우저 환경에서만 document.cookie를 사용할 수 있습니다.
      const tokenCookie = document.cookie
        .split("; ")
        .find((row: string) => row.startsWith("accessToken="));
      if (tokenCookie) {
        const token = tokenCookie.split("=")[1];
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default baseaxios;
