import { IsNotEmpty, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateReminderDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly text: string;

  @IsPositive()
  fromId: number

  @IsPositive()
  toId: number

}
