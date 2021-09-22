import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ContentToPlaylist } from "src/playlist/entities/content-to-playlist.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum CONTENT_TYPE {
  PICTURE = "PICTURE",
  HTML = "HTML",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
}

@Entity()
export class Content {
  @PrimaryGeneratedColumn() id: string;

  @ApiProperty({
    description: `Type of content`,
    type: CONTENT_TYPE,
    example: CONTENT_TYPE.PICTURE,
  })
  @Column("enum", { enum: CONTENT_TYPE })
  contentType: CONTENT_TYPE;

  @ApiProperty({
    description: "URL Path to content/rsc",
    type: String,
    example: "RANDOMURL",
  })
  @IsString()
  @Column("text", { unique: true })
  url: string;

  @OneToMany(
    () => ContentToPlaylist,
    (contentToPlaylist) => contentToPlaylist.content,
    { cascade: true }
  )
  contentToPlaylist: ContentToPlaylist[];
}
