import { IFilterApiDto } from "@infra/dtos/filter-api.dto";
import { IApiService } from "./api.interface";
import { IReturnApiDataTableDto } from "@infra/dtos/return-api-data-table.dto";
import { AnyObject } from "@infra/types";
import { IReturnApiDataDto } from "@infra/dtos/return-api-data.dto";

export interface IUserApiService extends IApiService {
    obterDados: () => Promise<
        | IReturnApiDataDto<AnyObject>
        | null
    >;
}