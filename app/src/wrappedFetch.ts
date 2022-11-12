export const queryApi = async <T>(url: string): Promise<T> => {
  console.log(`querying: ${url}`);
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  });
  const body = await response.json();
  return body as T;
};