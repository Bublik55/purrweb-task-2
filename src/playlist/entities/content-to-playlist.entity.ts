import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";
import { Content } from "src/content/entities/content.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Playlist } from "./playlist.entity";

@Entity()
export class ContentToPlaylist {
  @ApiProperty({
    description: "ContentToPlaylist`s id",
    example: "1",
    type: String,
  })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    description: "PlaylistId which contain content to playlist",
    example: "1",
    type: String,
  })
  @Column()
  @IsNumberString()
  playlistId: string;

  @ApiProperty({
    description: "ContentID which attached to playlist",
    example: "1",
    type: String,
  })
  @Column()
  @IsNumberString()
  contentId: string;

  @ApiProperty({
    description: "Playlist which contain content to playlist",
    example: Playlist,
    type: Playlist,
  })
  @ManyToOne(() => Playlist, (playlist) => playlist.contentToPlaylist, {
    onDelete: "CASCADE",
  })
  playlist: Promise<Playlist>;

  @ApiProperty({
    description: "Content which attached to playlist",
    example: Content,
    type: Content,
  })
  @ManyToOne(() => Content, (content) => content.contentToPlaylist, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  content: Content;

  @ApiProperty({
    description: "Duration of content in playlist",
    example: "2.43",
    type: String,
  })
  @IsNumberString()
  @Column("real")
  duration: string;

  @ApiProperty({
    description: "Order of content in playlist",
    example: "2",
    type: String,
  })
  @IsNumberString()
  @Column()
  order: string;
}
