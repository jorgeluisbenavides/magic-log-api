import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './../entities/user.entity';
import { CreateOrUpdateUserDto } from '../dtos/CreateOrUpdateUserDto';
import { ResponseUserDto } from '../dtos/ResponseUserDto';
import { UserMapper } from 'src/mappers/userMapperDto';
//import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    //private readonly authService: AuthService,
  ) { }

  async findByEmail(email: string) {
    const [user] = await this.userRepository.find({ where: { email } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    return user;
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find();

    return UserMapper.toResponseDtoList(users);
  }

  async findOne(id: number) {
    const [user] = await this.userRepository.find({ where: { id: id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    return user;
  }

  async create(body: CreateOrUpdateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const user = this.userRepository.create({ ...body, password: hashedPassword } as DeepPartial<User>);

      const userSignIn = await this.userRepository.save(user);

      return userSignIn; // await this.authService.login(userSignIn);
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
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const merge = this.userRepository.merge(user, { ...body, password: hashedPassword } as DeepPartial<User>);

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
