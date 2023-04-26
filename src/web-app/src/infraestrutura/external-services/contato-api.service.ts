import { IFilterApiDto } from "@infra/dtos/filter-api.dto";
import { IReturnApiDataTableDto } from "@infra/dtos/return-api-data-table.dto";
import { AnyObject } from "@infra/types";
import { AbstractApiService } from "./abstract-api.service";
import { IContatoApiService } from "./interface/contato-api.interface";

export class ContatoApiService extends AbstractApiService implements IContatoApiService {
  listar = async (filter?: IFilterApiDto | undefined): Promise<IReturnApiDataTableDto<AnyObject> | null>  => {
    const responseApi = await this.httpClientApi.get<
      IReturnApiDataTableDto<AnyObject>
    >(`api/cliente`);

    if (!responseApi.data.result) {
      throw new Error(responseApi.data.message);
    }
    return responseApi.data;
  }
};