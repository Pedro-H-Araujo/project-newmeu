import { Controller, Post, Body, Put, Get, Param, Delete } from '@nestjs/common';
import { User as UserModel, Prisma } from 'src/prisma/generated/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async signupUser(
        @Body() userData: { email: string; password: string }
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<UserModel | null> {
        return this.userService.user({ id: Number(id) });
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() userData: Prisma.UserUpdateInput,
    ): Promise<UserModel> {
        return this.userService.updateUser({
            where: { id: Number(id) },
            data: userData
        });
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<UserModel> {
        return this.userService.deleteUser({ id: Number(id) });
    }
}
     
