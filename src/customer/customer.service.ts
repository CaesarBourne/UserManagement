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
import { CustomerComplaintStatus } from './customer.complaint.enum';
import { AuthService } from 'src/auth/auth.service';

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
    const existingUser = await this.validateUser(createCustomerDto.username);

    this.logger.debug(
      `existing customer status   "${JSON.stringify(existingUser)}" `,
    );
    if (existingUser.status == 1) {
      return { status: 1, message: 'user already exists in database' };
    }

    const customer = new Customer();
    const { username, firstname, lastname, complaint, description, status } =
      createCustomerDto;
    customer.username = username;
    customer.firstName = firstname;
    customer.lastName = lastname;
    customer.complaint = complaint;
    customer.description = description;
    customer.status = CustomerComplaintStatus.OPEN;

    customer.customerID = uuidv4();
    const createdCustomer = await this.customerRepository.create(customer);

    this.logger.debug(
      `Succesfully created customer to  server   "${JSON.stringify(
        createdCustomer,
      )}" `,
    );
    const savedCustomer = this.customerRepository.save(createdCustomer);

    this.logger.verbose(
      `Succesfully added customer to database   "${JSON.stringify(
        savedCustomer,
      )}" `,
    );
    return savedCustomer;
  }
  async validateUser(username: string): Promise<any> {
    const user = await this.findOne(username);

    console.log('username Customer $$$ ', username);

    this.logger.debug(
      ` Value checkd in database if user exists   "${JSON.stringify(user)}" `,
    );

    if (user) {
      return { status: 1, message: 'user already exists' };
    } else {
      return { status: 0, message: 'New User' };
    }
  }

  findAll(id: string) {
    return this.customerRepository.findOneBy({ id });
  }

  findOne(username: string) {
    return this.customerRepository.findOneBy({ username });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
