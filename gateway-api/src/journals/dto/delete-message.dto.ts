import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteMessageDto {
  @IsNotEmpty()
  @IsString()
  readonly _id: string;

  @IsNotEmpty()
  @IsNumber()
  readonly version: number;
}
