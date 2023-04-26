import { AxiosInstance } from "axios";

export interface IApiService {
    readonly httpClientApi: AxiosInstance;
}