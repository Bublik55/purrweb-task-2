import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";
import { Display } from "src/display/entities/display.entity";
import { User } from "src/user/entities/user.entity";
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Event {
  @ApiProperty({
    description: "Event`s id",
    example: "98",
    type: String,
  })
  @IsNumberString()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    description: "Title of Event",
    example: "BEST EVENT",
    type: String,
  })
  title: string;

  @ApiProperty({
    description: "This is event`s author",
    example: User,
    type: User,
  })
  @ManyToOne(() => User, {
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinTable()
  author: Promise<User>;

  @ApiProperty({
    description: "Event`s displays",
    example: [Display],
    type: Display,
  })
  @OneToMany(() => Display, (displays) => displays.event, {
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  displays: Display[];
}
