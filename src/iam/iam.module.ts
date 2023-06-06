import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';
import { User } from '../users/entities/user.entity';
import { accRoles } from './authorization/access-control/acc-roles';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { RefreshTokenIdsStorage } from './authentication/refresh-token-ids.storage';
import { RolesGuard } from './authorization/guards/roles.guard';
import jwtConfig from './config/jwt.config';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    AccessControlModule.forRoles(accRoles)
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // },
    AuthenticationService,
    AccessTokenGuard,
    RefreshTokenIdsStorage
  ],
  controllers: [AuthenticationController]
})
export class IamModule {}
