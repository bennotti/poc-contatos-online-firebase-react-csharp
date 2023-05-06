import { IFilterApiDto } from "@infra/dtos/filter-api.dto";
import { IReturnApiDataTableDto } from "@infra/dtos/return-api-data-table.dto";
import { AnyObject } from "@infra/types";
import { AbstractApiService } from "./abstract-api.service";
import { IContatoApiService } from "./interface/contato-api.interface";
import { IReturnApiDto } from "@infra/dtos/return-api.dto";

export class ContatoApiService extends AbstractApiService implements IContatoApiService {
  listarDisponiveis = async (filter?: IFilterApiDto | undefined): Promise<IReturnApiDataTableDto<AnyObject> | null>  => {
    const responseApi = await this.httpClientApi.get<
      IReturnApiDataTableDto<AnyObject>
    >(`api/contato/disponivel`);

    if (!responseApi.data.result) {
      throw new Error(responseApi.data.message);
    }
    return responseApi.data;
  };
  favoritos = async (filter?: IFilterApiDto | undefined): Promise<IReturnApiDataTableDto<AnyObject> | null>  => {
    const responseApi = await this.httpClientApi.get<
      IReturnApiDataTableDto<AnyObject>
    >(`api/contato/favoritos`);

    if (!responseApi.data.result) {
      throw new Error(responseApi.data.message);
    }
    return responseApi.data;
  };
  favoritarDesfavoritar = async (item: AnyObject): Promise<IReturnApiDto | null> => {
    const responseApi = await this.httpClientApi.post<
    IReturnApiDto
    >(`api/contato/favoritos/toggle`, {
      username: item.username
    });

    if (!responseApi.data.result) {
      throw new Error(responseApi.data.message);
    }
    return responseApi.data;
  };
};