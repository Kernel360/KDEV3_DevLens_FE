import { APIError, APIResponse } from "@/types/common";

type Headers = Record<string, string>;
const defaultHeaders: Headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMSIsImxvZ2luSWQiOiJhc2RmMTIzIiwiZW1haWwiOiJhc2RmMTIzQG1vbmFtaS5jb20iLCJhdXRoIjoiUk9MRV9BRE1JTiIsImV4cCI6MTczODAyODg0Mn0.x91uFtykHz2H6qAS6P08rO_-gY4PmP0tTsJS2REQFFrVTQYentplmLN3INs9j4ZEWT6NagZsH8Zp1ZmvOw_QNA",
};

interface RequestOptions {
  rawResponse?: boolean;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
}

async function handleResponse<T>(response: Response): Promise<T> {
  try {
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      throw new APIError(
        response.status,
        `예상치 못한 응답 형식: ${contentType}`,
      );
    }

    const data: APIResponse<T> = await response.json();

    if (!response.ok || data.code >= 400) {
      throw new APIError(data.code, data.message);
    }

    return data.data;
  } catch (error) {
    if (error instanceof APIError) throw error;

    // 세션 만료 체크
    if (response.status === 401) {
      throw new APIError(401, "세션이 만료되었습니다.");
    }

    throw new APIError(
      response.status,
      "서버 응답을 처리하는 중 오류가 발생했습니다.",
    );
  }
}

function buildUrl(
  baseUrl: string,
  queryParams?: Record<string, string | number>,
) {
  if (!queryParams) return baseUrl;

  const searchParams = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  return `${baseUrl}?${searchParams.toString()}`;
}

/**
 * GET 요청
 * @param {string} url - 요청을 보낼 URL
 * @param {object} [headers] - 추가 헤더
 * @returns {Promise<object>} - 응답 데이터
 */
async function get<T>(
  url: string,
  options: {
    queryParams?: Record<string, string | number>;
    headers?: Headers;
  } = {},
): Promise<T> {
  const { queryParams, headers = {} } = options;
  const fullUrl = buildUrl(url, queryParams);

  const response = await fetch(fullUrl, {
    method: "GET",
    credentials: "include",
    headers: { ...defaultHeaders, ...headers },
  });
  return handleResponse<T>(response);
}

/**
 * POST 요청
 * @param {string} url - 요청을 보낼 URL
 * @param {object} body - 요청에 포함할 데이터 (JSON 형태)
 * @param {object} [options] - 요청 옵션
 * @returns {Promise<object>} - 응답 데이터
 */
async function post<T, U>(
  url: string,
  body: T,
  options: RequestOptions = {},
): Promise<U> {
  const { rawResponse = false, headers = {}, queryParams } = options;
  const fullUrl = buildUrl(url, queryParams);

  const response = await fetch(fullUrl, {
    method: "POST",
    credentials: "include",
    headers: { ...defaultHeaders, ...headers },
    body: JSON.stringify(body),
  });

  if (rawResponse) {
    return response as unknown as U;
  }

  return handleResponse<U>(response);
}

/**
 * PUT 요청
 * @param {string} url - 요청을 보낼 URL
 * @param {object} body - 요청에 포함할 데이터 (JSON 형태)
 * @param {object} [headers] - 추가 헤더
 * @returns {Promise<object>} - 응답 데이터
 */
async function put<T, U>(url: string, body: T, headers = {}): Promise<U> {
  const response = await fetch(url, {
    method: "PUT",
    credentials: "include",
    headers: { ...defaultHeaders, ...headers },
    body: JSON.stringify(body),
  });

  return handleResponse<U>(response);
}

/**
 * DELETE 요청
 * @param {string} url - 요청을 보낼 URL
 * @param {object} [params] - 추가 파라미터
 * @returns {Promise<object>} - 응답 데이터
 */
async function del<T>(
  url: string,
  params?: Record<string, string>,
): Promise<T> {
  const fullUrl = buildUrl(url, params);
  const response = await fetch(fullUrl, {
    method: "DELETE",
    credentials: "include",
    headers: defaultHeaders,
  });
  return handleResponse<T>(response);
}

async function patch<T, U>(url: string, body: T, headers = {}): Promise<U> {
  const response = await fetch(url, {
    method: "PATCH",
    credentials: "include",
    headers: { ...defaultHeaders, ...headers },
    body: JSON.stringify(body),
  });

  return handleResponse<U>(response);
}

// 모든 함수 묶어서 하나의 객체로 export
const restClient = {
  get,
  post,
  put,
  patch,
  delete: del, // delete는 예약어이므로 del로 함수 이름 변경
};

export default restClient;
