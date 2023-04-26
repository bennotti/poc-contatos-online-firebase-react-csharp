import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { env } from "@infra/env";
import { IApiService } from "./interface/api.interface";
import historico from "@infra/historico";



export async function tentarReautenticar(error: any) {
  error.config.retries = error.config.retries || 0;
  if (error && error.response && error.response.status === 401) {
    if (error.config.retries++ < 2)
      return axios.request(error.config);
    else return historico.push('/login');
    // return signinSilent().finally(() => Promise.reject(error));
  }

  throw error;
}

export async function authorizationHeaderInterceptor(
  config: InternalAxiosRequestConfig
) {
  var accessToken = localStorage.getItem('access_token');
  // pegar do localstorage
  
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


    this.httpClientApi.interceptors?.request.use(authorizationHeaderInterceptor);
    this.httpClientApi.interceptors?.response.use(
      response => response,
      error => {
        return tentarReautenticar(error);
      }
    );
  }
};