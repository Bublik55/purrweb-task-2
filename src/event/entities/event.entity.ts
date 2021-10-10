import { Display } from "src/display/entities/display.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => User, (author) => author.events, {
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn()
  author: User;
  @Column()
  authorId: string;

  @OneToMany(() => Display, (displays) => displays.event, {
    lazy: true,
    cascade: ["insert", "recover", "update"],
    onDelete: "NO ACTION",
  })
  displays: Display[];
}
