import {
  ConflictException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // async googleSignun =()
  async signup(createUserDto: CreateUserDto): Promise<string> {
    const { email, password, reenterpassword, username, avatar } =
      createUserDto;
    const exeistedUser = await this.findOne({ email });
    const user = new User();

    if (exeistedUser) {
      // throw new HttpException('Email is already existed!', HttpStatus.NOT_FOUND);
      throw new NotFoundException("Email is already registed")
    }

    const salt = await bcrypt.genSalt();
    user.email = email;
    
    if (password !== reenterpassword) {
      throw new ConflictException('Password is not compatible!');
    }
    user.password = await this.hashPassword(password, salt);

    if (username) {
      user.username = username;
    } else {
      user.username = email.split('@')[0];
    }

    user.salt = salt;
    user.bias = '';
    user.role = 1;

    if (avatar) {
      user.avatar = avatar;
    } else {
      user.avatar = 'https://image.flaticon.com/icons/png/512/166/166260.png';
    }

    try {
      await user.save();
      return 'Sign up successfully';
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
