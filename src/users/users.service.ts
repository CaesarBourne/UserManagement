import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserOrderStatus } from './users.status.enum';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    const { username, firstname, lastname, description } = createUserDto;

    user.username = username;
    user.firstName = firstname;
    user.lastName = lastname;
    user.description = description;
    user.status = UserOrderStatus.OPEN;

    // user.id = uuidv4();
    const createdUser = this.usersRepository.create(user);
    this.logger.debug(
      `Succesfully created user to  server   "${JSON.stringify(createdUser)}" `,
    );
    const savedUser = this.usersRepository.save(createdUser);

    this.logger.verbose(
      `Succesfully added user to database   "${JSON.stringify(savedUser)}" `,
    );
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
