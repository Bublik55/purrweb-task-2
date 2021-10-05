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
import { CreatorGuards } from "src/common/guards/creator.guard";
import { ContentOwnerGuard } from "src/auth/guards/owner.guards/content.owner.guard";
import { ContentService } from "./content.service";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";
import { Content } from "./entities/content.entity";

@ApiBearerAuth()
@ApiTags("Content crud")
@Controller("contents")
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @UseGuards(CreatorGuards)
  @ApiOperation({
    summary: "Create content",
    description: "Create content - save url in DB",
  })
  @ApiProperty({
    example: Content,
  })
  @ApiResponse({
    status: 201,
    type: Content,
  })
  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }

  @ApiOperation({
    summary: "Return  contents",
    description: "Return contents with authors",
  })
  @ApiResponse({
    status: 200,
    type: [Content],
  })
  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @ApiOperation({
    summary: "Return  content by ID",
    description: "Return content with author",
  })
  @ApiResponse({
    status: 200,
    type: Content,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.contentService.findOne(+id);
  }

  @UseGuards(ContentOwnerGuard)
  @ApiOperation({
    summary: "Update content by ID",
    description: "Set new url/path and TYPE of content",
  })
  @ApiResponse({
    status: 200,
    type: Content,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateContentDto: UpdateContentDto
  ) {
    return this.contentService.update(+id, updateContentDto);
  }

  @UseGuards(ContentOwnerGuard)
  @ApiOperation({
    summary: "Delete content",
    description:
      "Delete content -> return true. Return false when content dont exists",
  })
  @ApiResponse({
    status: 200,
    type: Boolean,
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.contentService.remove(id);
  }
}
