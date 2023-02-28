import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class KafkaMessageDto {
  @IsNotEmpty()
  @IsNumber()
  readonly num: number;
  @IsNotEmpty()
  @IsString()
  readonly status: string;
  @IsNumber()
  @IsNotEmpty()
  readonly score: number;
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
