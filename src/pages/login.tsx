import { ReactNode, useState } from "react";
import { Cookies } from "react-cookie";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { postLogin } from "../libs/api/auth";
import { PasswordInput, TextInput } from "../components/input/signInput";
import {
  emailValidationRules,
  passwordValidationRules,
} from "../components/input/formInputValidationRules";
import { useAtom } from "jotai";
import { User, userAtom } from "@/atoms/userAtom";

// Cookie 관련 함수들
const cookies = new Cookies();

export const setCookie = (name: string, value: string) => {
  return cookies.set(name, value, {
    path: "/",
    secure: true,
    maxAge: 86400,
  });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  return cookies.remove(name, { path: "/" });
};

// SignLayout 컴포넌트
interface SignLayoutProps {
  children: ReactNode;
  isSignin: boolean;
}

const SIGNIN_SENTENCE = {
  greeting: "오늘도 만나서 반가워요!",
  guiding: "회원이 아니신가요?",
  linkName: "회원가입하기",
  linkPath: "/signup",
};

// SignLayout 컴포넌트
export function SignLayout({ children }: SignLayoutProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
      <div className="flex w-full max-w-[52rem] flex-col items-center justify-center gap-8 px-4 lg:w-[30rem]">
        <Link href="/">
          <div className="flex flex-col items-end justify-center gap-12">
            <div className="relative h-auto w-[200px]">
              {" "}
              {/* 가로폭 200px */}
              <Image
                src="/logo/large_logo.svg"
                alt="logo"
                width={200} // 고정된 가로폭
                height={100} // 원하는 비율에 따라 적절한 높이 설정
                priority
                className="h-auto" // 자동으로 높이를 조정
              />
            </div>
            <div className="relative h-auto w-[200px]">
              {" "}
              {/* 가로폭 200px */}
              <Image
                src="/logo/large_Taskify.svg"
                alt="logo title"
                width={200} // 고정된 가로폭
                height={100} // 원하는 비율에 따라 적절한 높이 설정
                className="h-auto" // 자동으로 높이를 조정
              />
            </div>
          </div>
        </Link>
        <div className="text-2xl font-medium">{SIGNIN_SENTENCE.greeting}</div>
        {children}
        <div className="text-lg">
          <span>{SIGNIN_SENTENCE.guiding}</span>
          <Link
            href={SIGNIN_SENTENCE.linkPath}
            className="text-violet-500 ml-1 underline"
          >
            {SIGNIN_SENTENCE.linkName}
          </Link>
        </div>
      </div>
    </div>
  );
}

export interface SignInDataType {
  email: string;
  password: string;
}

// SignInForm 컴포넌트
export function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }, // isValid 추가
    getValues,
  } = useForm<SignInDataType>({ mode: "all" });
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [, setUser] = useAtom(userAtom);

  const onSubmit = async () => {
    setIsPending(true);
    const data = {
      email: getValues("email"),
      password: getValues("password"),
    };

    try {
      const response = await postLogin(data);
      setUser(response.user);
      const accessToken = response?.accessToken; // response의 구조에 맞게 수정
      if (accessToken) setCookie("accessToken", accessToken);
      toast.success("로그인 성공!");
      router.push("/mydashboard");
    } catch (error) {
      console.error(error);
      toast.error("로그인 실패! 다시 시도해 주세요.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4">
      {/* w-full과 px-4 추가 */}
      <div className="w-full py-3">
        <TextInput
          placeholder="이메일을 입력해주세요."
          labelName="이메일"
          {...register("email", emailValidationRules)}
          hasError={errors}
        />
        {errors.email && (
          <div className="text-red-500 pt-2 text-sm">
            {errors.email.message}
          </div>
        )}
      </div>

      <div className="w-full py-3">
        <PasswordInput
          placeholder="비밀번호를 입력해주세요."
          labelName="비밀번호"
          {...register("password", passwordValidationRules)}
          hasError={errors}
        />
        {errors.password && (
          <div className="text-red-500 pt-2 text-sm">
            {errors.password.message}
          </div>
        )}
      </div>

      <button
        disabled={!isValid || isPending} // 유효성 검사 성공 여부에 따라 버튼 활성화
        className={`mt-4 w-full rounded-lg py-4 text-lg font-medium text-white ${isValid ? "bg-[#5534da]" : "bg-[#9fa6b2]"} ${isPending ? "cursor-not-allowed" : ""}`} // 요청 중일 때 커서 변경
      >
        로그인
      </button>
    </form>
  );
}

// Toast 함수
export function toastUsingButton(message = "") {
  return toast((t) => (
    <div className="flex flex-col gap-5 p-6 text-lg text-black">
      <span>{message}</span>
      <button
        className="bg-violet-500 rounded-md px-10 py-2 text-white"
        onClick={() => toast.dismiss(t.id)}
      >
        확인
      </button>
    </div>
  ));
}

// SignInPage 컴포넌트
export default function SignInPage() {
  return (
    <SignLayout isSignin={true}>
      <SigninForm />
    </SignLayout>
  );
}
