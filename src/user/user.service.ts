import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      // REVU: Это должно валидироваться в папйпах, будет правльнее если из бизнесс логики не будут выбрасывать исключения
      throw new BadRequestException("Email or Login already exists");
    }
  }

  // REVU: User'ы отдаются с паролями
  async findAll() {
    return await this.userRepository.find({
      relations: ["events", "events.displays"],
    });
  }

  async findOneByName(name: string) {
    const user: User = await this.userRepository.findOne({
      where: { name: name },
    });
    if (user) return user;
    // REVU: Это должно валидироваться в папйпах, будет правльнее если из бизнесс логики не будут выбрасывать исключения
    else throw new NotFoundException(`Cannot find user with name ${name}`);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id, {
      relations: ["events", "events.displays"],
    });
    if (user) return user;
    // REVU: Это должно валидироваться в папйпах, будет правльнее если из бизнесс логики не будут выбрасывать исключения
    else throw new NotFoundException(`Cannot find user with id ${id}`);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne(id);
      user.name = updateUserDto.name;
      user.password = updateUserDto.password;
      // REVU: ?????
      user.email = user.email;

      //REVU: userRepository.update({ id }, updateUserDto)
      const ret = await this.userRepository.save(user);
      return ret;
    } catch (error) {
      throw new BadRequestException("Name/Password already exists");
    }
  }

  async remove(id: string) {
    const user = await this.userRepository.delete(id);
    if (user.affected) return true;
    else return false;
  }
}
