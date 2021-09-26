import { ApiProperty } from "@nestjs/swagger";
import { Event } from "src/event/entities/event.entity";
import { Playlist } from "src/playlist/entities/playlist.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Display {
  @ApiProperty({
    description: "Display`s id",
    example: "98",
    type: String,
  })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    description: "Playlist attached to display",
    example: Playlist,
    type: Playlist,
  })
  @OneToOne(() => Playlist, (playlist) => playlist.display, {
    eager: true,
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  playlist: Playlist;

  @ApiProperty({
    description: "Event - `owner` of Display- Promise",
    example: Event,
    type: Event,
  })
  @ManyToOne(() => Event, (event) => event.displays, {
    lazy: true,
    onDelete: "SET NULL",
  })
  event: Promise<Event>;

  @Column()
  authorId: string;

  @ApiProperty({
    description: "User -  owner of Display- Promise",
    example: User,
    type: User,
  })
  @ManyToOne(() => User, {
    cascade: true,
    onDelete: "CASCADE",
    lazy: true,
  })
  author: Promise<User>;
}
