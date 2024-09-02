import { NotFoundException, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(email: string, password: string) {
    const user: User = this.usersRepository.create({ email, password });
    return this.usersRepository.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.usersRepository.findOneBy({ id });
  }

  find(email: string) {
    return this.usersRepository.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<any | undefined> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found ');
    }
    return this.usersRepository.remove(user);
  }
}
