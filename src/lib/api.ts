// TODO move these into env vars
const RAPID_API = process.env.RAPID_API || '';
const API_KEY = process.env.API_KEY || '';

export type ApiResponse<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: Error;
    };

async function api<T>(
  endpoint: string,
  options?: Record<string, string>
): Promise<ApiResponse<T>> {
  try {
    const params = new URLSearchParams(options).toString();
    const res = await fetch(`https://${RAPID_API}/${endpoint}?${params}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': RAPID_API,
        'x-rapidapi-key': API_KEY,
      },
      next: {
        revalidate: false,
      },
    });

    if (!res.ok) {
      return {
        data: null,
        error: new Error(res.statusText),
      };
    }

    const { response } = await res.json();

    return {
      data: response,
      error: null,
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as Error,
    };
  }
}

export default api;
