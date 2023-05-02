import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteLabMessageDto {
  @IsNotEmpty()
  @IsString()
  readonly _id: string;

  @IsNotEmpty()
  @IsNumber()
  readonly version: number;
}
