import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumberString, IsString } from "class-validator";
import { randomUUID } from "crypto";
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Event } from "src/event/entities/event.entity";

@Entity()
export class User {
  @ApiProperty({
    example: randomUUID,
    type: String,
  })
  @IsNumberString()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    description: "User`s name",
    example: "Bob",
    type: String,
  })
  @IsString()
  @Column("text", { unique: true })
  name: string;

  @ApiProperty({
    description: "HASHED User's password",
    example: "Awesomepasswd_hash",
    type: String,
  })
  @IsString()
  @Column("text")
  password!: string;

  @ApiProperty({
    description: "User's email",
    example: "Awesome@some.me",
    type: String,
  })
  @IsEmail()
  @Column("text", { unique: true })
  email!: string;

  @ApiProperty({
    description: "User's events",
    example: Event,
    type: [Event],
  })
  @OneToMany(() => Event, (event) => event.user, {
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinTable()
  events: Event[];
}
