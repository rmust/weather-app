export enum Endpoint {
  AUTHORIZE = "authorize",
  CITIES = "cities",
  WEATHERS = "weathers",
}

const baseHeaders = new Headers({
  accept: "application/json",
  "content-type": "application/json",
});

const proxyUrl = "http://0.0.0.0:8080";
const baseApiUrl = "https://weather-api.isun.ch/api";
const getApiUrl = (endpoint: Endpoint | string) =>
  `${proxyUrl}/${baseApiUrl}/${endpoint}`;

export type ParsedError = {
  status: number;
  message: string;
};

const baseRequest = async (requestPromise: Promise<Response>) => {
  const request = await requestPromise;
  if (!request.ok) {
    return {
      error: { status: request.status, message: request.statusText },
    };
  }
  const data = await request.json();
  return { data };
};

export const postRequest = (body: any, endpoint: Endpoint) => {
  const requestPromise = fetch(getApiUrl(endpoint), {
    method: "post",
    headers: new Headers(baseHeaders),
    body: JSON.stringify(body),
  });

  return baseRequest(requestPromise);
};

export const getRequest = (
  endpoint: Endpoint | string,
  authToken: string,
  signal?: AbortSignal
) => {
  const requestPromise = fetch(getApiUrl(endpoint), {
    method: "GET",
    headers: new Headers({
      ...baseHeaders,
      authorization: `Bearer ${authToken}`,
    }),
    signal,
  });
  return baseRequest(requestPromise);
};
