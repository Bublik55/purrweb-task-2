import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DisplayService } from "./display.service";
import { CreateDisplayDto } from "./dto/create-display.dto";
import { UpdateDisplayDto } from "./dto/update-display.dto";

@Controller("display")
export class DisplayController {
  constructor(private readonly displayService: DisplayService) {}

  @Post()
  create(@Body() createDisplayDto: CreateDisplayDto) {
    return this.displayService.create(createDisplayDto);
  }

  @Get()
  findAll() {
    return this.displayService.findAll();
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
