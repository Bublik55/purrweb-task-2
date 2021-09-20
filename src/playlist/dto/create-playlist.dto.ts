import { ApiProperty } from "@nestjs/swagger";

export class CreatePlaylistDto {
  @ApiProperty({
    description: "Displayid to attach playlist",
    example: "1",
  })
  displayId: string;
  @ApiProperty({
    description: "This contain array of [contentId, order, duration]",
    example: [
      [1, 1, 5.43],
      [1, 2, 3.43],
    ],
  })
  content: [[id: string, order: number, duration: number]];
}
