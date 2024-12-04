import { AxiosResponse } from 'axios';

const mockAxios = {
  get: jest.fn().mockResolvedValue({} as AxiosResponse),
  post: jest.fn().mockResolvedValue({} as AxiosResponse),
  put: jest.fn().mockResolvedValue({} as AxiosResponse),
  delete: jest.fn().mockResolvedValue({} as AxiosResponse),
};

export default mockAxios;
