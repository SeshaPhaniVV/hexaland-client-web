import axios from 'axios';

export const API_BASE_URL = '/server/api';

export const getBaseUrlRoot = () => {
  return `http://localhost:8080`;
};

/**
 * Creates Axios Instance.
 *
 * @type {AxiosInstance}
 */
export const apiAxios = axios.create({
  baseURL: `${getBaseUrlRoot()}${API_BASE_URL}`,
});
