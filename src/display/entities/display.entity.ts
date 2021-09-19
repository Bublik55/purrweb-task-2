import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Event } from "src/event/entities/event.entity";
import { Playlist } from "src/playlist/entities/playlist.entity";

@Entity()
export class Display {
  @PrimaryGeneratedColumn("uuid") id: string;

  @OneToOne(() => Playlist, (playlist) => playlist.display, {
    eager: true,
  })
  @JoinColumn()
  playlist: Playlist;

  @ManyToOne(() => Event, (event) => event.displays)
  event: Event;
}
