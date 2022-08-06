import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { AuthCredenntialsDTO } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async signUp(authCredenntialsDTO: AuthCredenntialsDTO): Promise<void> {
    const { username, password } = authCredenntialsDTO;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const user = this.usersRepository.create({ username, password: hashedPassword });

      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') { // duplicated username
        throw new ConflictException("Username already exists")
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authCredenntialsDTO: AuthCredenntialsDTO): Promise<{ accessToken: string }> {
    const { username, password } = authCredenntialsDTO;

    // try {
    const user = await this.usersRepository.findOneBy({ username });
    const samePassword = await bcrypt.compare(password, user.password);
    if (user && samePassword) {

      const payload: JwtPayload = { username }
      const accessToken = this.jwtService.sign(payload)

      return { accessToken }
    } else {
      throw new UnauthorizedException("Please check your login credentials")
    }

    //   await this.usersRepository.save(user);
    // } catch (error) {
    //   if (error.code === '23505') { // duplicated username
    //     throw new ConflictException("Username already exists")
    //   } else {
    //     throw new InternalServerErrorException();
    //   }
    // }
  }
}
