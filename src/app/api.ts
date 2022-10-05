import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const BACKEND_URL = 'http://localhost:5000';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (
  onError: (message: string) => void
): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
      const { response } = error;
      console.log(error);

      if (!response) {
        return onError('Bad response');
      }

      if (response && response.status) {
        return onError(`Bad response ${response.status}`);
      }

      return Promise.reject(error);
    }
  );

  return api;
};
