import { IsNotEmpty, IsString } from "../../pipes/validationPipe";

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  description: string;
}
