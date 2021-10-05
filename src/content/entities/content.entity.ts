import { ApiProperty } from "@nestjs/swagger";
import { ContentToPlaylist } from "src/playlist/entities/content-to-playlist.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum CONTENT_TYPE {
  PICTURE = "PICTURE",
  HTML = "HTML",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
}

@Entity()
export class Content {
  @ApiProperty({
    description: "Content`s id",
    example: "98",
    type: String,
  })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    description: `Type of content`,
    example: CONTENT_TYPE,
  })
  @Column("enum", { enum: CONTENT_TYPE })
  contentType: CONTENT_TYPE;

  @ApiProperty({
    description: "URL Path to content/rsc",
    type: String,
    example: "RANDOMURL",
  })
  @Column("text", { unique: true })
  path: string;

  @OneToMany(
    () => ContentToPlaylist,
    (contentToPlaylist) => contentToPlaylist.content,
    { cascade: true }
  )
  contentToPlaylist: ContentToPlaylist[];

  @Column()
  authorId: string;
  @ApiProperty({
    description: "User -  owner of Content - Promise",
    example: User,
    type: User,
  })
  @ManyToOne(() => User, {
    onDelete: "CASCADE",
    lazy: true,
  })
  author: Promise<User>;
}
