import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
export const sanitizeString = (searchPhrase: string) => searchPhrase.trim();

export class GetVarsQuery {
  @IsNotEmpty()
  @Type(() => String)
  @Transform(({ value }) =>
    typeof value === 'string'
      ? sanitizeString(value).split(/\s+/).join(' | ')
      : value,
  )
  search?: string;
}
