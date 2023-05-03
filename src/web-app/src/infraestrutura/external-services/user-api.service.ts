import { IFilterApiDto } from "@infra/dtos/filter-api.dto";
import { IReturnApiDataTableDto } from "@infra/dtos/return-api-data-table.dto";
import { AnyObject } from "@infra/types";
import { AbstractApiService } from "./abstract-api.service";
import { IUserApiService } from "./interface/user-api.interface";
import { IReturnApiDataDto } from "@infra/dtos/return-api-data.dto";

export class UserApiService extends AbstractApiService implements IUserApiService {
  obterDados = async (): Promise<IReturnApiDataDto<AnyObject> | null>  => {
    const responseApi = await this.httpClientApi.get<
      IReturnApiDataDto<AnyObject>
    >(`api/user/info`);
    return responseApi?.data;
  }
};