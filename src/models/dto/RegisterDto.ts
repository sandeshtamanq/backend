import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "../../pipes/validationPipe";

export class RegisterDto {
  @IsString()
  @MaxLength(20)
  @MinLength(5)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MaxLength(20)
  @MinLength(5)
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MaxLength(25)
  @MinLength(7)
  password: string;
}
