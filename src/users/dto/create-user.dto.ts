import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserOrderStatus } from '../users.status.enum';

export class CreateUserDto {
  @IsNotEmpty()
  description: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  role: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  firstname: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  lastname: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @IsOptional()
  @IsIn([
    UserOrderStatus.OPEN,
    UserOrderStatus.DONE,
    UserOrderStatus.IN_PROGRESS,
  ])
  status: UserOrderStatus;
}
