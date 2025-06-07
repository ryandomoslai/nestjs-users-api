import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [];

    private findUserIndex(id: number): number {
        const userIndex = this.users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return userIndex;
    }

    findAll(): User[] {
        return this.users;
    }

    findByID(id: number): User {
        const userIndex = this.findUserIndex(id);

        return this.users[userIndex];
    }

    create(user: CreateUserDto): User {
        const newUser: User = {
            id: Date.now(),
            ...user
        };

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, newValues: CreateUserDto): User {
        const userIndex = this.findUserIndex(id);

        const { name, email } = newValues;
        const newUser: User = {
            ...this.users[userIndex],
            name,
            email
        };
        this.users[userIndex] = newUser;

        return newUser;
    }

    deleteByID(id: number): User {
        const userIndex = this.findUserIndex(id);

        const deletedUser = this.users.splice(userIndex, 1);

        return deletedUser[0];
    }
}
