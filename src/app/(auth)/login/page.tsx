import { TextAnimate } from "@/components/magicui/text-animate";
import { Button } from "@/components/ui";
import { Info } from "lucide-react";
import HeroAnimation from "./_components/HeroAnimation";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh w-dvw lg:grid-cols-2">
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6 md:p-10">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* <Image
            src={logo}
            alt="데브렌즈 로고"
            quality={75}
            className="mb-8 w-40"
          /> */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
            <div className="mb-4 flex text-blue-800">
              <Info className="mr-2 size-6" />
              테스트 계정 안내
            </div>
            <div className="space-y-1 text-sm font-medium leading-relaxed">
              <p>• admin01 (시스템관리자)</p>
              <p>• client01 (고객사)</p>
              <p>• dev01 (개발사)</p>
            </div>
            <div className="mt-4 text-sm">비밀번호: asdf123!</div>
          </div>
          <LoginForm />
          <div className="text-xs text-muted-foreground">
            © 2025 DevLens. All rights reserved.
          </div>
          <div className="flex gap-2">
            <Button variant="link" asChild className="hover:text-primary">
              <a
                href="https://github.com/Kernel360/KDEV3_DevLens_FE"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Frontend Repository"
                title="Frontend Repository"
                className="text-xs"
              >
                Frontend
              </a>
            </Button>
            <Button variant="link" asChild className="hover:text-primary">
              <a
                href="https://github.com/Kernel360/KDEV3_DevLens_BE"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Backend Repository"
                title="Backend Repository"
                className="text-xs"
              >
                Backend
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="relative hidden flex-col justify-center bg-gradient-to-b from-blue-500 to-indigo-700 lg:flex">
        <HeroAnimation />
        <div className="relative z-10 space-y-10 break-keep p-12 text-white">
          <TextAnimate
            by="line"
            duration={3}
            className="drop-shadow-xs w-full text-wrap text-4xl font-bold leading-relaxed"
          >
            {"고객사와 개발사를 하나로, \n프로젝트 관리 플랫폼"}
          </TextAnimate>
          <TextAnimate
            by="line"
            delay={3}
            duration={3}
            className="mt-2 text-lg"
          >
            {
              "데브렌즈는 프로젝트 진행 상황을 한눈에 파악하고, \n소통과 피드백을 간편하게 관리할 수 있는 서비스입니다."
            }
          </TextAnimate>
        </div>
      </div>
    </div>
  );
}
