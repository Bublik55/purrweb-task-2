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
import { ContentGuard } from "src/content/guards/content.owner.guard";
import { CreatorGuard } from "src/common/guards/creator.guard";
import { ContentService } from "./content.service";
import { CreateContentDto } from "./dto/create-content.dto";
import { GetContentDto } from "./dto/get-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";
import { ContentExistPipe } from "../common/pipes/content-exists.pipe";

@ApiBearerAuth()
@ApiTags("Content crud")
@Controller("contents")
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @UseGuards(CreatorGuard)
  @ApiOperation({ summary: "Create content" })
  @ApiResponse({ status: 201, type: GetContentDto })
  @Post()
  async create(@Body() createContentDto: CreateContentDto) {
    const obj = await this.contentService.create(createContentDto);
    return new GetContentDto(obj);
  }

  @ApiOperation({ summary: "Return  contents" })
  @ApiResponse({ status: 200, type: [GetContentDto] })
  @Get()
  async findAll() {
    const obj = await this.contentService.findAll();
    return obj.map((content) => new GetContentDto(content));
  }

  @ApiOperation({ summary: "Return  content by ID" })
  @ApiResponse({ status: 200, type: GetContentDto })
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: string) {
    const obj = await this.contentService.findOne(+id);
    return new GetContentDto(obj);
  }

  @UseGuards(ContentGuard)
  @ApiOperation({
    summary: "Update content by ID",
    description: "Set new url/path and TYPE of content",
  })
  @ApiResponse({ status: 200 })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe, ContentExistPipe) id: string,
    @Body() updateContentDto: UpdateContentDto
  ) {
    this.contentService.update(+id, updateContentDto);
  }

  @UseGuards(ContentGuard)
  @ApiOperation({
    summary: "Delete content",
    description: "Delete content",
  })
  @ApiResponse({ status: 200 })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.contentService.remove(id);
  }
}
