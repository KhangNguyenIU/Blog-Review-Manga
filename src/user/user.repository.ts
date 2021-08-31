import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signup(createUserDto: CreateUserDto): Promise<string> {
    const { username, password, reenterpassword } = createUserDto;
    const exeistedUser = await this.findOne({ username });
    if (exeistedUser) {
      throw new ConflictException('Username is already existed');
    }

    if (password !== reenterpassword) {
      throw new ConflictException('Password is not compatible!');
    }

    const salt = await bcrypt.genSalt();
    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;
    user.role =1;
    user.avatar = 'https://image.flaticon.com/icons/png/512/166/166260.png';
    try {
      await user.save();
      return 'Sign up successfully';
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
