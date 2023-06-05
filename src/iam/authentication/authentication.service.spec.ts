import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../users/entities/user.entity';
import { createMockRepository } from '../__mocks/mock-repository';
import jwtConfig from '../config/jwt.config';
import { BcryptService } from '../hashing/bcrypt.service';
import { HashingService } from '../hashing/hashing.service';
import { AuthenticationService } from './authentication.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';
describe('AuthenticationService', () => {
  let service: AuthenticationService;
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
        },
        RefreshTokenIdsStorage
      ]
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
