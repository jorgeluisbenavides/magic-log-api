import { User } from "src/users/entities/user.entity";
import { ResponseUserDto } from "src/users/dtos/ResponseUserDto";

export class UserMapper {
  static toResponseDto(user: User): ResponseUserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profile,
      active: user.active,
    };
  }

  static toResponseDtoList(users: User[]): ResponseUserDto[] {
    return users.map(user => this.toResponseDto(user));
  }
}