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

export const postRequest = async (body: any, endpoint: Endpoint) => {
  try {
    const response = await fetch(getApiUrl(endpoint), {
      method: "post",
      headers: new Headers(baseHeaders),
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error };
  }
};

export const getRequest = async (
  endpoint: Endpoint | string,
  authToken: string,
  signal?: AbortSignal
) => {
  try {
    const response = await fetch(getApiUrl(endpoint), {
      method: "GET",
      headers: new Headers({
        ...baseHeaders,
        authorization: `Bearer ${authToken}`,
      }),
      signal,
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error };
  }
};
