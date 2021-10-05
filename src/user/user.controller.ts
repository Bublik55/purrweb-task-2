import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { UserGuard } from "./guards/user.guard";
import { GetUserDto } from "./dto/get-user.dto";
import { GetEventDto } from "src/event/dto/get-event.dto";
@ApiBearerAuth()
@ApiTags("User")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: "Create User",
    description: "Create user",
  })
  @ApiResponse({ status: 201, type: GetUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return new GetUserDto(user);
  }

  // REVU: Кажется что без гварда, тут кто-угодно может получить информацию о всех юзерах
  @ApiOperation({
    summary: "Get Users",
    description: "Get all users with events",
  })
  @ApiResponse({ status: 200, type: [GetUserDto] })
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((user) => new GetUserDto(user));
  }

  // REVU: Кажется что без гварда, тут кто-угодно может получить информацию о любом юзере
  @ApiOperation({
    summary: "Get User",
    description: "Get user by id",
  })
  @ApiProperty({ example: User })
  @ApiResponse({ status: 200, type: GetUserDto })
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: string) {
    const user = await this.userService.findOneById(id);
    return new GetUserDto(user);
  }

  @UseGuards(UserGuard)
  @ApiOperation({
    summary: "Update user",
    description: "Update user if user exists",
  })
  @ApiResponse({ status: 200 })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    this.userService.update(id, updateUserDto);
  }

  @UseGuards(UserGuard)
  @ApiOperation({
    summary: "Delete user",
    description: "Delete user",
  })
  @ApiResponse({ status: 200 })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.userService.remove(id);
  }

  @ApiOperation({
    summary: "Delete user",
    description: "Delete user",
  })
  @ApiResponse({ status: 200, type: [GetEventDto] })
  @Get(":id/events")
  async getEventsByUser(@Param("id", ParseIntPipe) id: string) {
    const user = await this.userService.findOneById(id);
    const events = await user.events;
    return events.map((event) => new GetEventDto(event));
  }
}
