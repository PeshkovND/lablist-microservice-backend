import fetch from 'node-fetch';

export const fetchHttp = async <T>(url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error');
  }

  return (await response.json()) as T;
};
