import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { User } from './../entities/user.entity';
import { CreateOrUpdateUserDto } from '../dtos/CreateOrUpdateUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const [user] = await this.userRepository.find({ where: { id: id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    return user;
  }

  async create(body: CreateOrUpdateUserDto) {
    try {
      const user = this.userRepository.create(body as DeepPartial<User>);

      return await this.userRepository.save(user);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('El email ya está en uso');
      }
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async update(id: number, body: CreateOrUpdateUserDto) {
    const [user] = await this.userRepository.find({ where: { id: id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const merge = this.userRepository.merge(user, body as DeepPartial<User>);

    return await this.userRepository.save(merge);
  }

  async delete(id: number) {
    const [user] = await this.userRepository.find({ where: { id: id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    try {
      await this.userRepository.delete(id);

      return { message: 'Usuario eliminado' };
    } catch (err) {
      throw new InternalServerErrorException(
        `Error al eliminar usuario: ${err}`,
      );
    }
  }
}
