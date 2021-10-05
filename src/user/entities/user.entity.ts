import { ApiProperty } from "@nestjs/swagger";
import { Event } from "src/event/entities/event.entity";
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @ApiProperty({
    example: "1",
    type: String,
  })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    description: "User`s name",
    example: "Bob",
    type: String,
  })
  @Column("text", { unique: true })
  username: string;

  @ApiProperty({
    description: "HASHED User's password",
    example: "Awesomepasswd_hash",
    type: String,
  })
  @Column("text")
  password!: string;

  @ApiProperty({
    description: "User's email",
    example: "Awesome@some.me",
    type: String,
  })
  @Column("text", { unique: true })
  email!: string;

  @ApiProperty({
    description: "User's events",
    example: Event,
    type: [Event],
  })
  @OneToMany(() => Event, (event) => event.author, {
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinTable()
  events: Promise<Event[]>;
}
