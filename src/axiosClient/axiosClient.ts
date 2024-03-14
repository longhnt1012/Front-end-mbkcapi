import axios, { AxiosResponse } from 'axios';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.delete['Access-Control-Allow-Origin'] = '*';
const url= "http://143.198.83.220:5000/api/v1";
const axiosClient = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosServiceAddress = axios.create({
  baseURL: 'https://vapi.vnappmob.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosFormData = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const setHeaderAuth = (accessToken: string) => {
  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  axiosFormData.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

axiosServiceAddress.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosServiceAddress.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { axiosClient, axiosFormData, axiosServiceAddress, setHeaderAuth };