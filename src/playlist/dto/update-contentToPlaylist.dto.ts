import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { ContentToPlaylistDto } from "./content-to-playlist.dto";

export class UpdateContentToPlaylistDto extends PartialType(
  OmitType(ContentToPlaylistDto, ["contentId"] as const)
) {
  @ApiProperty({ example: "1" })
  contentToPlaylistId: string;
}
