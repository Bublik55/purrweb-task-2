import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DisplayService } from "./display.service";
import { CreateDisplayDto } from "./dto/create-display.dto";
import { UpdateDisplayDto } from "./dto/update-display.dto";
@ApiBearerAuth()
@ApiTags("Display")
@Controller("displays")
export class DisplayController {
  constructor(private readonly displayService: DisplayService) {}

  @Post()
  create(@Body() createDisplayDto: CreateDisplayDto) {
    return this.displayService.create(createDisplayDto);
  }

  @Get()
  findAll(@Param("eventid") eventId: string) {
    return this.displayService.findAll(eventId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.displayService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDisplayDto: UpdateDisplayDto) {
    return this.displayService.update(+id, updateDisplayDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.displayService.remove(+id);
  }
}
