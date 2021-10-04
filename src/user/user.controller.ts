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
import { UserOwnerGuard } from "src/utils/auth/guards/owner.guards/user.owner.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
@ApiBearerAuth()
@ApiTags("User CRUD")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: "Create User",
    description: "Create user",
  })
  @ApiProperty({
    example: User,
  })
  @ApiResponse({
    status: 201,
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // REVU: Кажется что без гварда, тут кто-угодно может получить информацию о всех юзерах
  @ApiOperation({
    summary: "Get Users",
    description: "Get all users with events",
  })
  @ApiProperty({
    example: [User],
  })
  @ApiResponse({
    status: 200,
    type: [User],
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // REVU: Кажется что без гварда, тут кто-угодно может получить информацию о любом юзере
  @ApiOperation({
    summary: "Get User",
    description: "Get user by id",
  })
  @ApiProperty({ example: User })
  @ApiResponse({
    status: 200,
    type: User,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(UserOwnerGuard)
  @ApiOperation({
    summary: "Update user",
    description: "Update user if user exists",
  })
  @ApiProperty({
    example: User,
  })
  @ApiResponse({
    status: 200,
    type: User,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(UserOwnerGuard)
  @ApiOperation({
    summary: "Delete user",
    description:
      "Delete user and return true. Return false when user don't exists",
  })
  @ApiProperty({
    example: User,
  })
  @ApiResponse({
    status: 200,
    type: Boolean,
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.userService.remove(id);
  }
}
