import { ApiProperty } from "@nestjs/swagger";
import { Display } from "src/display/entities/display.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContentToPlaylist } from "./content-to-playlist.entity";

@Entity()
export class Playlist {
  @ApiProperty({
    description: "Playlist`s id",
    example: "1",
    type: String,
  })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    description: "User - owner of paylist",
    example: User,
    type: User,
  })
  @ManyToOne(() => User, {
    onDelete: "CASCADE",
    lazy: true,
  })
  author: Promise<User>;

  @ApiProperty({
    description: "Display - `owner` of playlist",
    example: Display,
    type: Display,
  })
  @OneToOne(() => Display, (display) => display.playlist, {
    onDelete: "CASCADE",
  })
  display: Promise<Display>;

  @ApiProperty({
    description: "ContentToPlaylist which contain order,duration and content",
    example: ContentToPlaylist,
    type: [ContentToPlaylist],
  })
  @OneToMany(
    () => ContentToPlaylist,
    (contentToPlaylist) => contentToPlaylist.playlist,
    {
      eager: true,
      cascade: true,
    }
  )
  @JoinColumn()
  contentToPlaylist: ContentToPlaylist[];

  @Column()
  authorId: string;
}
