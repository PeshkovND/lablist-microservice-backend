import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class KafkaMessageDto {
  @IsNotEmpty()
  @IsNumber()
  readonly num: number;

  @IsOptional()
  @IsString()
  readonly status?: string;

  @IsNumber()
  @IsOptional()
  readonly score?: number;

  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly journalId: string;

  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsNotEmpty()
  @IsDateString()
  readonly date: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly version: number;
}
