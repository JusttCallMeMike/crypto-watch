import { IsString } from 'class-validator';



export class PairDto {
  @IsString()
  readonly name: string;

}