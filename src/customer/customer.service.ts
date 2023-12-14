import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomerService {
  private logger = new Logger('CustomerService');
  constructor(
    // @Inject('CUSTOMER_REPOSITORY')
    // private customerRepository: Repository<Customer>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = new Customer();
    const { username, firstname, lastname, complaint } = createCustomerDto;
    customer.username = username;
    customer.firstName = firstname;
    customer.lastName = lastname;
    customer.complaint = complaint;
    customer.id = uuidv4();
    const createdCustomer = this.customerRepository.create(customer);

    const savedCustomer = this.customerRepository.save(createdCustomer);

    this.logger.verbose(
      `Succesfully added customer to database   "${JSON.stringify(
        savedCustomer,
      )}" `,
    );
    return savedCustomer;
  }

  findAll(id: number) {
    return this.customerRepository.findOneBy({ id });
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
