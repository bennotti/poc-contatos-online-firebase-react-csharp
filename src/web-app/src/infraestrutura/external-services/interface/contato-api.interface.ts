import { IFilterApiDto } from "@infra/dtos/filter-api.dto";
import { IApiService } from "./api.interface";
import { IReturnApiDataTableDto } from "@infra/dtos/return-api-data-table.dto";
import { AnyObject } from "@infra/types";

export interface IContatoApiService extends IApiService {
    listarDisponiveis: (filter?: IFilterApiDto) => Promise<
        | IReturnApiDataTableDto<AnyObject>
        | null
    >;
    listar: (filter?: IFilterApiDto) => Promise<
        | IReturnApiDataTableDto<AnyObject>
        | null
    >;
}