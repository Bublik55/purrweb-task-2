import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByName(username: string): Promise<User> {
    return this.userRepository.findOne({ username: username });
  }
  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email: email });
  }
  async findEventsByUserId(id: string) {
    const user = await this.userRepository.findOne(id, {
      relations: ["events"],
    });
    return user.events;
  }

  async findOneById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.userRepository.update({ id }, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
