import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    let user = new User(createUserDto);
    if (await this.userRepository.save(user)) {
      return (user);
    }
    else {
      throw new BadRequestException('Email or Login already exists')
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOneByName(name: string) {
    let user: User =await this.userRepository.findOne({name: name});
    if (user)
      return user;
    else 
      throw new NotFoundException(`Cannot find user with name ${name}`);
  }


  async findOne(id: number) {
    let user = await this.userRepository.findOne(id);
    if (user)
      return user;
    else 
      throw new NotFoundException(`Cannot find user with id ${id}`);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    let user = await this.userRepository.delete(id);
    if (user) 
      return true;
    else 
      return false;
  }
}
