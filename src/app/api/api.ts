import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const instance = axios.create({
  timeout: 10000,
});
const api = setupCache(instance);

const cachedRecords: { [url: string]: any } = {}; // Cache for different URLs

export const get = async <T>(url: string): Promise<T> => {
  try {
    const response = await api.get<T>(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from ${url}: ${error}`);
  }
};

export const fetchRecords = async <T>(url: string): Promise<T> => {
  if (cachedRecords[url]) {
    return cachedRecords[url] as T;
  }

  try {
    const response = await api.get<T>(url, {
      cache: {
        maxAge: 3600000,
      },
    });

    cachedRecords[url] = response.data;
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from ${url}: ${error}`);
  }
};

export default api;
