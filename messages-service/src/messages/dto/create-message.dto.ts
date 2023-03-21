import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsNumber()
  readonly num: number;

  @IsString()
  @IsOptional()
  readonly status?: string;

  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly journalId: string;

  @IsNotEmpty()
  @IsString()
  readonly text: string;
}
