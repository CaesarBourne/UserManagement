import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CustomerComplaintStatus } from '../customer.complaint.enum';

export class CreateCustomerDto {
  title: string;

  @IsNotEmpty()
  description: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

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
    CustomerComplaintStatus.OPEN,
    CustomerComplaintStatus.DONE,
    CustomerComplaintStatus.IN_PROGRESS,
  ])
  status: CustomerComplaintStatus;
}
