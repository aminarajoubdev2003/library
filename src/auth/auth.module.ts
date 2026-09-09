import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports:[TypeOrmModule.forFeature([User]),
  JwtModule.register({
      secret: 'my-secret-key',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  PassportModule.register({defaultStrategy: 'jwt'})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule,JwtModule],
})
export class AuthModule {}
