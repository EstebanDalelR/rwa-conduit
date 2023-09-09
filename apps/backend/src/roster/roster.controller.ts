import { Controller, Get } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('roster')
export class RosterController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @Get()
  async getRoster() {
    return await this.userService.findAll();
  }
}
