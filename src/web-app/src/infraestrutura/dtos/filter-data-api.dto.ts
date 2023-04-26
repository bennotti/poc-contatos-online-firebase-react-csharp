import { IFilterApiDto } from './filter-api.dto';

export interface IFilterDataApiDto<T> extends IFilterApiDto {
  data: T | undefined;
}
