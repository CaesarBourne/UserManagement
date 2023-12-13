import { DataSource } from 'typeorm';
import { Customer } from './entities/customer.entity';

export const customerProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Customer),
    inject: ['DATA_SOURCE'],
  },
];
