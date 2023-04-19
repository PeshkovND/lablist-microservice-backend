import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateLabDto {
  @IsOptional()
  @IsNumber()
  readonly num?: number;

  @IsNotEmpty()
  @IsString()
  readonly status?: string;

  @IsOptional()
  @IsNotEmpty()
  readonly score?: number;

  @IsOptional()
  @IsString()
  readonly userId?: string;

  @IsOptional()
  @IsString()
  readonly journalId?: string;

  @IsNotEmpty()
  @IsDateString()
  readonly dateOfCreation: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly version: number;
}
