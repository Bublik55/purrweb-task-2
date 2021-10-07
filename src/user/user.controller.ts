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
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { GetEventDto } from "src/event/dto/get-event.dto";
import { UserExistsPipe } from "../common/pipes/user-exists.pipe";
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserGuard } from "./guards/user.guard";
import { CreateUserPipe } from "./pipes/creat-user.pipe";
import { UserService } from "./user.service";
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
  async create(@Body(CreateUserPipe) createUserDto: CreateUserDto) {
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
  @ApiOperation({ summary: "Get User by id" })
  @ApiResponse({ status: 200, type: GetUserDto })
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: string) {
    const user = await this.userService.findOneById(id);
    return new GetUserDto(user);
  }

  @UseGuards(UserGuard)
  @ApiOperation({ summary: "Update user" })
  @ApiResponse({ status: 200 })
  @Patch(":id")
  update(
    @Param("id", UserExistsPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    this.userService.update(id, updateUserDto);
  }

  @UseGuards(UserGuard)
  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({ status: 200 })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.userService.remove(id);
  }

  @ApiOperation({ summary: "Get events by user" })
  @ApiResponse({ status: 200, type: [GetEventDto] })
  @Get(":id/events")
  async getEventsByUser(@Param("id", UserExistsPipe) id: string) {
    const user = await this.userService.findOneById(id);
    const events = await user.events;
    return events.map((event) => new GetEventDto(event));
  }
}
