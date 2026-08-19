import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    const users = await this.usersService.findAll();
    return {
      success: true,
      count: users.length,
      users,
    };
  }

  @Patch(':id/role')
  async updateRole(
    @Param('id') id: string,
    @Body('role') role: string,
  ) {
    const updated = await this.usersService.updateRole(id, role);
    return {
      success: true,
      user: updated,
    };
  }
}
