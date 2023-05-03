import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { env } from "@infra/env";
import { IApiService } from "./interface/api.interface";



export function tentarReautenticar(httpClientApi: AxiosInstance) {
  return async (error: any) => {
    error.config.retries = error.config.retries || 0;

    if (error.response && error.response.status === 401) {
      if (error.config.retries++ < 2){
        // console.log('error', error.config.retries);
        return httpClientApi.request(error.config);
      } else {
        // console.log('error', error.config.retries);
        localStorage.removeItem('access_token');
        window.location.href = '/login';
        return null;
      }
    }
    throw error;
  };
}

export async function authorizationHeaderInterceptor(
  config: InternalAxiosRequestConfig
) {
  var accessToken = localStorage.getItem('access_token');
  // pegar do localstorage
  // console.log('accessToken middleware', accessToken);
  if (!config || (config && !config.headers) || !accessToken) {
    return config;
  }
  const authorization = (
    (config as AxiosRequestConfig).headers as AxiosRequestHeaders
  ).Authorization;
  if (!authorization) {
    (
      (config as AxiosRequestConfig).headers as AxiosRequestHeaders
    ).Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

export class AbstractApiService implements IApiService {
  httpClientApi: AxiosInstance;
  constructor() {
    this.httpClientApi = axios.create({
      baseURL: env.API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseInterceptor = tentarReautenticar(this.httpClientApi);

    this.httpClientApi.interceptors?.request.use(authorizationHeaderInterceptor);
    this.httpClientApi.interceptors?.response.use(
      response => response,
      error => {
        return responseInterceptor(error);
      }
    );
  }
};