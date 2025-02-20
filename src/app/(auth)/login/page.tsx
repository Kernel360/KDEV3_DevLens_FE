import Image from "next/image";
import { LoginForm } from "./_components/login-form";
import logo from "/public/logo.png";
import background from "/public/background.png";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh w-dvw lg:grid-cols-2">
      <div className="flex h-full items-center justify-center gap-4 p-6 md:p-10">
        <LoginForm />
      </div>
      <div className="relative hidden flex-col justify-center bg-muted lg:flex">
        <Image
          src={background}
          alt="데브렌즈 소개 이미지"
          quality={75}
          className="absolute inset-0 h-full w-full object-cover object-bottom brightness-50 dark:brightness-[0.2]"
          priority
        />
        <div className="relative z-10 space-y-10 break-keep p-12 pt-24">
          <h1 className="drop-shadow-xs w-full text-wrap text-4xl font-bold leading-relaxed text-white">
            고객사와 개발사를 하나로,
            <span className="md:block">프로젝트 관리 플랫폼</span>
          </h1>
          <p className="mt-2 text-xl text-white/90">
            데브렌즈는 프로젝트 진행 상황을 한눈에 파악하고, <br />
            소통과 피드백을 간편하게 관리할 수 있는 서비스입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
