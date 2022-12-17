export const getQueryParams = (query: string): string[] => {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const result = searchParams.get(query);
  return result?.split(",") || [];
};

export const getAuthToken = () => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    return authToken;
  }
  return undefined;
};
