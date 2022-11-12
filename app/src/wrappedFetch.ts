export const queryApi = async <T>(url: string, meth: string = 'GET', resBody?: any, ): Promise<T> => {
  console.log(`querying: ${url}`);
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(resBody),
    method: meth
  });
  const body = await response.json();
  return body as T;
};