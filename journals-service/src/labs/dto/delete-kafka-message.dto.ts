import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteKafkaMessageDto {
  @IsNotEmpty()
  @IsString()
  readonly _id: string;

  @IsNotEmpty()
  @IsNumber()
  readonly version: number;
}
