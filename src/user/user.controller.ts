import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ParseIntPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
@ApiTags("User CRUD")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiProperty({
    description: "Create user",
  })
  @ApiResponse({
    status: 200,
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.userService.remove(id);
  }
}
