// pages/api/login.js
import axios from "axios";

interface LoginInfo {
  email: string;
  password: string;
}

interface userInfo {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}

export async function postLogin(loginInfo: LoginInfo) {
  try {
    const response = await axios.post(
      "https://sp-taskify-api.vercel.app/9-2/auth/login",
      loginInfo,
    );
    return response.data as userInfo;
  } catch (error) {
    console.log("auth api error");
    throw error;
  }
}

interface PasswordInfo {
  password: string;
  newPassword: string;
}

export async function ChangePassword(passwordInfo: PasswordInfo) {
  try {
    const response = await axios.put(
      "https://sp-taskify-api.vercel.app/9-2/auth/login",
      passwordInfo,
    );
    return response.data;
  } catch (error) {
    console.log("auth api error");
    throw error;
  }
}
