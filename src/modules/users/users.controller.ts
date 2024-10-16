import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/user.entity';
//DTOS
import { GetAllQueryDTO } from './dto/list-users.dto';
import { EntityNotFound } from 'src/config/exception.config';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  //GET -> /users
  // @Get()
  // all(@Query() query: GetAllQueryDTO): object {
  //   return this.usersService.listAll(query.search);
  // }

  //GET -> users/new
  @Get('new')
  newUser() {
    const user = this.usersService.newUser();
    return user;
  }

  //GET -> /users/{id}
  @Get(':id')
  async userById(@Param('id') id: string) {
    try {
      const user = await this.usersService.userById(id);
      return user;
    } catch (err) {
      if (err instanceof EntityNotFound) {
        throw new NotFoundException(err.message);
      }
      throw err;
    }
  }

  //DELETE /users/remove/{id}
  @Delete('remove/:id')
  removeUser(@Param('id') id: string) {
    try {
      return this.usersService.deleteUser(id);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}
