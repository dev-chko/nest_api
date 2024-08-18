import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // see if email is in use
    const users = await this.usersService.find(email);
    if (users.length > 0) {
      throw new BadRequestException('Email in use');
    }
    // hash the user password
    //generate salte
    const salt = randomBytes(8).toString('hex');
    //hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    //Join the hashed result and the salte together
    const result = salt + '.' + hash.toString('hex');
    // Create a new user and save it
    const user = this.usersService.create(email, result);
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salte, storedhash] = user.password.split('.');
    const hash = (await scrypt(password, salte, 32)) as Buffer;
    if (storedhash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }
    return user;
  }
}
