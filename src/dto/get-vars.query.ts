import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export const sanitizeString = (searchPhrase: string) => searchPhrase.trim();

export class GetVarsQuery {
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) =>
    typeof value === 'string'
      ? sanitizeString(value).split(/\s+/).join(' | ')
      : value,
  )
  search?: string;
}
