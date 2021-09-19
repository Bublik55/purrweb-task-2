import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { Display } from "src/display/entities/display.entity";
import { User } from "src/user/entities/user.entity";
import {
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Event {
  @ApiProperty({
    description: "Event`s id",
    example: randomUUID,
    type: String,
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    description: "This is event`s author",
    example: User,
    type: User,
  })
  @ManyToOne(() => User, (user) => user.events)
  user: User;

  @ApiProperty({
    description: "Event`s displays",
    example: [Display],
    type: Display,
  })
  @OneToMany(() => Display, (displays) => displays.event, {
    eager: true,
  })
  @JoinTable()
  displays: Display[];
}
