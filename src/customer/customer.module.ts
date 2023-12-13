import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { DatabaseModule } from 'src/database/database.module';
import { customerProviders } from './customer.provider';

@Module({
  controllers: [CustomerController],
  providers: [...customerProviders, CustomerService],

  imports: [DatabaseModule],
})
export class CustomerModule {}
