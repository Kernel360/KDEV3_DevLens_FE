type Headers = Record<string, string>;
const defaultHeaders: Headers = {
  "Content-Type": "application/json",
};

// 모든 요청 쿠키에 토큰 추가

/**
 * GET 요청
 * @param {string} url - 요청을 보낼 URL
 * @param {object} [headers] - 추가 헤더
 * @returns {Promise<object>} - 응답 데이터
 */
async function get(url: string, headers = {}) {
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials:"include",
      headers: { ...defaultHeaders, ...headers },
    });

    if (!response.ok) {
      throw new Error(`GET request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("GET Error:", error);
    throw error;
  }
}

function buildUrl(baseUrl: string, params?: Record<string, string>): string {
  if (!params) return baseUrl;

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });

  return `${baseUrl}?${searchParams.toString()}`;
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
  try {
    const fullUrl = buildUrl(url, queryParams);

    const response = await fetch(fullUrl, {
      method: "POST",
      credentials:"include",
      headers: { ...defaultHeaders, ...headers },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`POST request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
}

/**
 * PUT 요청
 * @param {string} url - 요청을 보낼 URL
 * @param {object} body - 요청에 포함할 데이터 (JSON 형태)
 * @param {object} [headers] - 추가 헤더
 * @returns {Promise<object>} - 응답 데이터
 */
async function put<T, U>(url: string, body: T, headers = {}): Promise<U> {
  try {
    const response = await fetch(url, {
      method: "PUT",
      credentials:"include",
      headers: { ...defaultHeaders, ...headers },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`PUT request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("PUT Error:", error);
    throw error;
  }
}

/**
 * DELETE 요청
 * @param {string} url - 요청을 보낼 URL
 * @param {object} [headers] - 추가 헤더
 * @returns {Promise<object>} - 응답 데이터
 */
async function del(url: string, headers = {}) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      credentials:"include",
      headers: { ...defaultHeaders, ...headers },
    });

    if (!response.ok) {
      throw new Error(`DELETE request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("DELETE Error:", error);
    throw error;
  }
}

// 모든 함수 묶어서 하나의 객체로 export
const restClient = {
  get,
  post,
  put,
  delete: del, // delete는 예약어이므로 del로 함수 이름 변경
};

export default restClient;
