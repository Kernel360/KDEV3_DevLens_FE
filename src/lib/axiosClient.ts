import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";
import { APIError, APIResponse } from "@/types/common";

// API 응답 파싱 옵션 타입
interface RequestConfig {
  rawResponse?: boolean;
}

// Axios 인스턴스 생성
const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 15000,
    withCredentials: true,
  });

  instance.interceptors.response.use(
    function <T extends object = object>(
      response: AxiosResponse<APIResponse<T>>,
    ): T | AxiosResponse<APIResponse<T>> {
      const config = response.config as RequestConfig;
      if (config.rawResponse) {
        return response;
      }

      const { code, message, data } = response.data;
      if (code >= 400) {
        throw new APIError(code, message);
      }
      return data;
    },
    function (error: AxiosError): never {
      if (error.response) {
        const { status, data } = error.response;

        if (
          data &&
          typeof data === "object" &&
          "code" in data &&
          "message" in data
        ) {
          const apiResponse = data as APIResponse<unknown>;
          throw new APIError(apiResponse.code, apiResponse.message);
        }

        throw new APIError(
          status,
          "서버 응답을 처리하는 중 오류가 발생했습니다.",
        );
      }

      throw new APIError(500, "서버와 통신하는 중 오류가 발생했습니다.");
    },
  );

  return instance;
};

// 서버사이드 환경을 위한 baseURL 설정
const getBaseUrl = () => {
  if (typeof window === "undefined") {
    return process.env.API_URL; // 서버 환경용 URL
  }
  return process.env.NEXT_PUBLIC_API_URL; // 클라이언트 환경용 URL
};

// Main API와 Admin API mutator 함수 생성
export const mainAxios = <T>(config: AxiosRequestConfig): Promise<T> => {
  const instance = createAxiosInstance(`${getBaseUrl()}/main`);
  return instance(config) as Promise<T>;
};

export const adminAxios = <T>(config: AxiosRequestConfig): Promise<T> => {
  const instance = createAxiosInstance(
    `${process.env.NEXT_PUBLIC_API_URL}/admin`,
  );
  return instance(config) as Promise<T>;
};

export default mainAxios;
