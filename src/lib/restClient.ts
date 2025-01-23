import { APIError, APIResponse } from "@/types/common";

type Headers = Record<string, string>;
const defaultHeaders: Headers = {
  "Content-Type": "application/json",
};

function buildUrl(baseUrl: string, params?: Record<string, string>): string {
  if (!params) return baseUrl;

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });

  return `${baseUrl}?${searchParams.toString()}`;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data: APIResponse<T> = await response.json();

  if (!response.ok || data.code >= 400) {
    throw new APIError(data.code, data.message);
  }

  return data.data;
}

/**
 * GET 요청
 * @param {string} url - 요청을 보낼 URL
 * @param {object} [headers] - 추가 헤더
 * @returns {Promise<object>} - 응답 데이터
 */
async function get<T>(url: string, headers = {}): Promise<T> {
  const response = await fetch(url, {
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
 * @param {object} [headers] - 추가 헤더
 * @returns {Promise<object>} - 응답 데이터
 */
async function post<T, U>(
  url: string,
  body: T,
  headers = {},
  queryParams?: Record<string, string>,
): Promise<U> {
  const fullUrl = buildUrl(url, queryParams);
  const response = await fetch(fullUrl, {
    method: "POST",
    credentials: "include",
    headers: { ...defaultHeaders, ...headers },
    body: JSON.stringify(body),
  });

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
