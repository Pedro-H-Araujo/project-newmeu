import { Controller, Post, Body } from '@nestjs/common';
import { User as UserModel } from 'src/prisma/generated/client';
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
}
     
