import { Event } from "src/event/entities/event.entity";
import { Playlist } from "src/playlist/entities/playlist.entity";
import { User } from "src/user/entities/user.entity";
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Display {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Playlist, (playlist) => playlist.display, {
    lazy: true,
    onDelete: "NO ACTION",
    onUpdate: "SET NULL",
    nullable: true,
    cascade: ["insert"],
  })
  playlist: Promise<Playlist>;

  @ManyToOne(() => Event, (event) => event.displays, {
    lazy: true,
    onDelete: "SET NULL",
    nullable: true,
  })
  @JoinColumn({ name: "eventId" })
  event: Promise<Event>;

  @ManyToOne(() => User, {
    cascade: true,
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn({ name: "authorId" })
  author: Promise<User>;
}
