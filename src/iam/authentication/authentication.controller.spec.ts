import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { createMockRepository } from '../__mocks/mock-repository';
import jwtConfig from '../config/jwt.config';
import { BcryptService } from '../hashing/bcrypt.service';
import { HashingService } from '../hashing/hashing.service';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        JwtService,
        {
          provide: HashingService,
          useClass: BcryptService
        },
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository()
        },
        {
          provide: jwtConfig.KEY,
          useValue: {
            secret: 'test_secret',
            audience: 'localhost',
            issuer: 'localhost',
            accessTokenTtl: parseInt('3600', 10)
          }
        }
      ],
      controllers: [AuthenticationController]
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
