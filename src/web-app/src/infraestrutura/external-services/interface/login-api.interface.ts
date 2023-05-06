import { IFilterApiDto } from "@infra/dtos/filter-api.dto";
import { IApiService } from "./api.interface";
import { IReturnApiDataTableDto } from "@infra/dtos/return-api-data-table.dto";
import { AnyObject } from "@infra/types";
import { IReturnApiDataDto } from "@infra/dtos/return-api-data.dto";
import { IReturnApiDto } from "@infra/dtos/return-api.dto";

export interface ILoginApiService extends IApiService {
    validarUsername: (payload: AnyObject) => Promise<
        IReturnApiDataDto<AnyObject>
        | null
    >;
    validarServidor: (nome: string) => Promise<
        IReturnApiDataDto<AnyObject>
        | null
    >;
    autenticar: (payload: AnyObject) => Promise<
        | IReturnApiDataDto<AnyObject>
        | null
    >;
    endSession: () => Promise<IReturnApiDto | null>;
}