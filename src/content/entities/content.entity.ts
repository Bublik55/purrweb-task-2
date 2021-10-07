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
  @PrimaryGeneratedColumn()
  id: string;

  @Column("enum", { enum: CONTENT_TYPE })
  contentType: CONTENT_TYPE;

  @Column("text", { unique: true })
  path: string;
  @OneToMany(
    () => ContentToPlaylist,
    (contentToPlaylist) => contentToPlaylist.content,
    { cascade: true, onDelete: "NO ACTION", nullable: true }
  )
  contentToPlaylist: ContentToPlaylist[];

  @ManyToOne(() => User, {
    onDelete: "CASCADE",
    lazy: true,
  })
  author: Promise<User>;

  @Column()
  authorId: string;
}
