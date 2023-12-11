import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  title: string;

  @IsNotEmpty()
  description: string;
}
