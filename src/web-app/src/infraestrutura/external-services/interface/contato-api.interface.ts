import { IFilterApiDto } from "@infra/dtos/filter-api.dto";
import { IApiService } from "./api.interface";
import { IReturnApiDataTableDto } from "@infra/dtos/return-api-data-table.dto";
import { AnyObject } from "@infra/types";
import { IReturnApiDto } from "@infra/dtos/return-api.dto";

export interface IContatoApiService extends IApiService {
    listarDisponiveis: (filter?: IFilterApiDto) => Promise<
        | IReturnApiDataTableDto<AnyObject>
        | null
    >;
    favoritos: (filter?: IFilterApiDto) => Promise<
        | IReturnApiDataTableDto<AnyObject>
        | null
    >;
    favoritarDesfavoritar: (item: AnyObject) => Promise<
        IReturnApiDto
        | null
    >;
}