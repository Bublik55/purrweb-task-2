import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "src/event/entities/event.entity";
import { Playlist } from "src/playlist/entities/playlist.entity";

@Entity()
export class Display {

	@PrimaryGeneratedColumn('uuid') id: string;



	@ManyToOne(() => Event, event => event.displays )
	event: Event;

	@OneToOne(() => Playlist, playlist => playlist.display)
	playlist: Playlist;
}
