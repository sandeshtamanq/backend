import { IsEmail, IsNotEmpty } from "../../pipes/validationPipe";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
