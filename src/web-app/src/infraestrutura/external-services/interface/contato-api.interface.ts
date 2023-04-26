import { IFilterApiDto } from "@infra/dtos/filter-api.dto";
import { IApiService } from "./api.interface";
import { IReturnApiDataTableDto } from "@infra/dtos/return-api-data-table.dto";
import { AnyObject } from "@infra/types";

export interface IContatoApiService extends IApiService {
    listar: (filter?: IFilterApiDto) => Promise<
        | IReturnApiDataTableDto<AnyObject>
        | null
    >;
}