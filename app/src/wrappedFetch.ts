export const queryApi = async <T>(url: string, meth: string = 'GET', resBody?: any, ): Promise<T> => {
  console.log(`querying: ${url}`);
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    },
    body: resBody,
    method: meth
  });
  const body = await response.json();
  return body as T;
};