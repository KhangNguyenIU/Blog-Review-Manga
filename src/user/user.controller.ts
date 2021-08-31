import { Body, Controller, Param, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  
}
