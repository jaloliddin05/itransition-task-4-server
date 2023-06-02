import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, EntityManager } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto, UpdateUserDto } from './dto';

Injectable();
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly connection: DataSource,
  ) {}

  async getAll(
    options: IPaginationOptions,
    where?: FindOptionsWhere<User>,
  ): Promise<Pagination<User>> {
    return paginate<User>(this.userRepository, options, {
      order: {
        name: 'ASC',
      },
    });
  }

  async getByEmail(email: string) {
    const data = await this.userRepository.findOne({ where: { email } });
    if (!data) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async getOne(id: string) {
    const data = await this.userRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.userRepository.delete(id);
    return response;
  }

  async deleteMore(ids: string[]) {
    const response = await this.userRepository
      .createQueryBuilder()
      .delete()
      .where('id IN(:...ids)', { ids })
      .execute();
    return response;
  }

  async updateLoginDate(id: string) {
    const date = new Date();
    const response = await this.userRepository.update(
      { id },
      {
        lastLoginTime: date,
      },
    );
    return response;
  }

  async change(value: UpdateUserDto, id: string) {
    const response = await this.userRepository
      .createQueryBuilder()
      .update()
      .set(value as unknown as User)
      .where('id = :id', { id })
      .execute();
    return response;
  }

  async changeStatus(status: boolean, ids: string[]) {
    const response = await this.userRepository
      .createQueryBuilder()
      .update()
      .set({ status })
      .where('id IN(:...ids)', { ids })
      .execute();
    return response;
  }

  async create(data: CreateUserDto) {
    try {
      const user = new User();
      user.name = data.name;
      user.email = data.email;
      await user.hashPassword(data.password);
      await this.connection.transaction(async (manager: EntityManager) => {
        await manager.save(user);
      });
      return user;
    } catch (error) {
      console.log(error.detail);

      if (error.code === '23505') {
        throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
      } else {
      }
    }
  }
}
