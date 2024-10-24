import baseaxios from "./axios";

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
    const response = await baseaxios.post("/users", {
      email,
      nickname,
      password,
    });
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
    const response = await baseaxios.put("/auth/password", {
      password,
      newPassword,
    });
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
    const response = await baseaxios.get("/users/me", {});
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
    const { nickname, profileImageUrl } = updateData;
    const response = await baseaxios.put("/users/me", {
      nickname,
      profileImageUrl,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    handleAxiosError(error);
  }
}
