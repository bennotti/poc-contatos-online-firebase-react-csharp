import { IFilterApiDto } from "@infra/dtos/filter-api.dto";
import { IReturnApiDataTableDto } from "@infra/dtos/return-api-data-table.dto";
import { AnyObject } from "@infra/types";
import { AbstractApiService } from "./abstract-api.service";
import { ILoginApiService } from "./interface/login-api.interface";
import { IReturnApiDataDto } from "@infra/dtos/return-api-data.dto";

export class LoginApiService extends AbstractApiService implements ILoginApiService {
  validarUsername = async (payload: AnyObject): Promise<IReturnApiDataDto<AnyObject> | null>  => {
    const responseApi = await this.httpClientApi.post<
      IReturnApiDataDto<AnyObject>
    >(`api/valida/username`, payload);

    if (!responseApi.data.result) {
      throw new Error(responseApi.data.message);
    }
    return responseApi.data;
  }
  validarServidor = async (nome: string): Promise<IReturnApiDataDto<AnyObject> | null>  => {
    const responseApi = await this.httpClientApi.post<
      IReturnApiDataDto<AnyObject>
    >(`api/valida/servidor`, {
      nome,
    });

    if (!responseApi.data.result) {
      throw new Error(responseApi.data.message);
    }
    return responseApi.data;
  }
  autenticar = async (payload: AnyObject): Promise<IReturnApiDataDto<AnyObject> | null>  => {
    const responseApi = await this.httpClientApi.post<
      IReturnApiDataDto<AnyObject>
    >(`api/auth`, payload);

    if (!responseApi.data.result) {
      throw new Error(responseApi.data.message);
    }
    return responseApi.data;
  }
};