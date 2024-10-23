import axios from "axios";

// AxiosError 타입을 수동으로 정의
interface AxiosError {
  isAxiosError: boolean;
  response?: {
    data: {
      message: string;
    };
  };
}

interface RegisterPayloadType {
  email: string;
  nickname: string;
  password: string;
}

interface ChangePasswordPayloadType {
  password: string;
  newPassword: string;
}

interface UpdateInformationPayloadType {
  nickname: string;
  profileImageUrl?: string;
}

// isAxiosError 판별 함수 직접 정의
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

function handleAxiosError(error: unknown) {
  if (isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || "Unknown Axios error";
    console.error("API Error:", errorMessage);
    throw new Error(errorMessage);
  }
  throw new Error("An unknown error occurred.");
}

export async function signUp(registerData: RegisterPayloadType) {
  try {
    const { email, nickname, password } = registerData;
    const response = await axios.post(
      "https://sp-taskify-api.vercel.app/9-2/users",
      { email, nickname, password },
    );
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function changePassword(passwordData: ChangePasswordPayloadType) {
  try {
    const { password, newPassword } = passwordData;
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.put(
      "https://sp-taskify-api.vercel.app/9-2/auth/password",
      { password, newPassword },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function getUserInfo() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      "https://sp-taskify-api.vercel.app/9-2/users/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function updateUserInfo(updateData: UpdateInformationPayloadType) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const { nickname, profileImageUrl } = updateData;
    const response = await axios.put(
      "https://sp-taskify-api.vercel.app/9-2/users/me",
      { nickname, profileImageUrl },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    handleAxiosError(error);
  }
}
