import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { DisplayOwnerGuard } from "src/utils/auth/guards/owner.guards/display.owner.guard";
import { DisplayService } from "./display.service";
import { CreateDisplayDto } from "./dto/create-display.dto";
import { UpdateDisplayDto } from "./dto/update-display.dto";
import { Display } from "./entities/display.entity";
@ApiBearerAuth()
@ApiTags("Display")
@Controller("displays")
export class DisplayController {
  constructor(private readonly displayService: DisplayService) {}

  @ApiOperation({
    summary: "Create display",
    description:
      "Create display and attach user to it. Attach display to event",
  })
  @ApiProperty({
    example: Display,
  })
  @ApiResponse({
    status: 201,
    type: Display,
  })
  @Post()
  create(@Body() createDisplayDto: CreateDisplayDto) {
    return this.displayService.create(createDisplayDto);
  }

  @ApiOperation({
    summary: "Return all displays",
    description: "Return displays with author, event, playlist",
  })
  @ApiResponse({
    status: 200,
    type: [Display],
  })
  @Get()
  findAll() {
    return this.displayService.findAll();
  }

  @ApiOperation({
    summary: "Return Display by ID",
    description: "Return displays with author, event, playlist",
  })
  @ApiResponse({
    status: 200,
    type: [Display],
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.displayService.findOne(+id);
  }

  @UseGuards(DisplayOwnerGuard)
  @ApiOperation({
    summary: "Update Display by ID",
    description: "Attach playlist to display",
  })
  @ApiResponse({
    status: 200,
    type: Display,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDisplayDto: UpdateDisplayDto) {
    return this.displayService.update(+id, updateDisplayDto);
  }

  @UseGuards(DisplayOwnerGuard)
  @ApiOperation({
    summary: "Delete display",
    description:
      "Delete display and return true. Return false when display dont exists",
  })
  @ApiResponse({
    status: 200,
    type: Boolean,
  })
  @Delete(":id")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.displayService.remove(+id);
  }
}
