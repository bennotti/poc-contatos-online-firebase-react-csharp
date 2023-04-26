import { IFilterApiDto } from "@infra/dtos/filter-api.dto";
import { IApiService } from "./api.interface";
import { IReturnApiDataTableDto } from "@infra/dtos/return-api-data-table.dto";
import { AnyObject } from "@infra/types";
import { IReturnApiDataDto } from "@infra/dtos/return-api-data.dto";

export interface ILoginApiService extends IApiService {
    autenticar: (payload: AnyObject) => Promise<
        | IReturnApiDataDto<AnyObject>
        | null
    >;
}