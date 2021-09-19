import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";
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
  @IsNumberString()
  @PrimaryGeneratedColumn()
  id: string;

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
  user: Promise<User>;

  @ApiProperty({
    description: "Event`s displays",
    example: [Display],
    type: Display,
  })
  @OneToMany(() => Display, (displays) => displays.event, {
    lazy: true,
  })
  @JoinTable()
  displays: Display[];
}
