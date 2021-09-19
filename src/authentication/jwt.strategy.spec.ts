import { JwtStrategy } from './jwt.strategy';
import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { isHalfWidth } from 'class-validator';
import exp from 'constants';
import { UnauthorizedException } from '@nestjs/common';

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('validate', () => {
    it('should validates and return the user based on JWT payload', async () => {
      const user = new User();
      user.username = 'TestUserName';

      userRepository.findOne.mockResolvedValue(user);
      const result = await jwtStrategy.validate({ username: 'TestUserName' });

      expect(userRepository.findOne).toHaveBeenCalledWith({
        username: 'TestUserName',
      });
      expect(result).toEqual(user);
    });

    it('should throws an unauthorized exception as user cannot be found', () => {
      userRepository.findOne.mockResolvedValue(null);

      expect(jwtStrategy.validate({ username: 'testUser' })).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
