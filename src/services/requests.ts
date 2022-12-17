export enum Endpoint {
  AUTHORIZE = "authorize",
  CITIES = "cities",
  WEATHERS = "weathers",
}

export const postRequest = async (body: any, endpoint: Endpoint) => {
  try {
    const response = await fetch(
      `http://0.0.0.0:8080/https://weather-api.isun.ch/api/${endpoint}`,
      {
        method: "post",
        headers: new Headers({
          accept: "application/json",
          "content-type": "application/json",
        }),
        body: JSON.stringify(body),
      }
    );
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
    const response = await fetch(
      `http://0.0.0.0:8080/https://weather-api.isun.ch/api/${endpoint}`,
      {
        method: "GET",
        headers: new Headers({
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${authToken}`,
        }),
        signal,
      }
    );
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error };
  }
};
