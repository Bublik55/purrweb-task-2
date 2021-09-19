import { Event } from "src/event/entities/event.entity";
import { Playlist } from "src/playlist/entities/playlist.entity";
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Display {
  @PrimaryGeneratedColumn("uuid") id: string;

  @OneToOne(() => Playlist, (playlist) => playlist.display, {
    eager: true,
  })
  @JoinColumn()
  playlist: Playlist;

  @ManyToOne(() => Event, (event) => event.displays, {
    onDelete: "CASCADE",
  })
  event: Event;
}
