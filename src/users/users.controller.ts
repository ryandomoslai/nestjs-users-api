import { Controller, Get, Post, Body, Param, NotFoundException, Put } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(): User[] {
        return this.usersService.findAll();
    }

    @Get(':id')
    getUserByID(@Param('id') id: string): User {
        return this.usersService.findByID(Number(id));
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): User {
        return this.usersService.create(createUserDto);
    }

    @Put(':id')
    updateUser(
        @Param('id') id: string, 
        @Body() createUserDto: CreateUserDto
    ): User {
        return this.usersService.update(Number(id), createUserDto)
    }
}