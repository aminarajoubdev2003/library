import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService:JwtService
  ) {}

  async create(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = this.userRepository.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      role: UserRole.MEMBER,
    });
    return  this.userRepository.save(user);
  }

  async login(loginDto:LoginDto) {
    const user = await this.userRepository.findOne({ where:{ email:loginDto.email }});
    if( !user ){
      throw new UnauthorizedException('Invalid email');
    }

    const password = await bcrypt.compare(loginDto.password,user.password)
    if( !password ){
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = this.jwtService.sign({
      sub:user.id,
      email:user.email,
      role:user.role
    })
    return accessToken
  }

  
}
