export const BASE_URL = 'http://localhost:4000/api';

class ApiError extends Error {
  constructor(public response: Response) {
    super('ApiError:' + response.status);
  }
}

export const apiInstance = async <T>(
  url: string,
  init?: RequestInit & { json?: unknown }
) => {
  let headers = init?.headers ?? {};

  if (init?.json) {
    headers = {
      'Content-Type': 'application/json',
      ...headers
    };

    init.body = JSON.stringify(init.json);
  }

  const result = await fetch(`${BASE_URL}${url}`, {
    ...init,
    headers,
    cache: 'no-store'
  });

  if (!result.ok) {
    throw new ApiError(result);
  }

  const data = (await result.json()) as Promise<T>;

  return data;
};
