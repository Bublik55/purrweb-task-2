import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ContentToPlaylist } from "src/playlist/entities/content-to-playlist.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum CONTENT_TYPE {
  PICTURE,
  HTML,
  VIDEO,
  AUDIO,
}

@Entity()
export class Content {
  @PrimaryGeneratedColumn("uuid") id: string;

  @ApiProperty({
    description: "Order in playlist",
    type: Number,
    example: 1,
  })
  order: number;

  @ApiProperty({
    description: `Type of content`,
    type: CONTENT_TYPE,
    example: CONTENT_TYPE.PICTURE,
  })
  @Column("text")
  contentType: CONTENT_TYPE;

  @ApiProperty({
    description: "URL Path to content/rsc",
    type: String,
    example: "RANDOMURL",
  })
  @IsString()
  @Column("text")
  url: string;

  @OneToMany(
    () => ContentToPlaylist,
    (contentToPlaylist) => contentToPlaylist.content
  )
  contentToPlaylist: ContentToPlaylist[];
}
