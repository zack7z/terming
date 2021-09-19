import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import exp from 'constants';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

const mockCredentialsDto = {
  username: 'TestUserName',
  password: 'TestPassword',
};

describe('UserRepository', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signup', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockResolvedValue({ save });
    });

    it('should successfully signs up the user', function () {
      save.mockResolvedValue(undefined);
      expect(userRepository.signUp(mockCredentialsDto)).resolves.toThrow();
    });

    it('should throws a conflict exception as username already exists', function () {
      save.mockRejectedValue({ code: '23505' });
      expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throws a internal server error', function () {
      save.mockRejectedValue({ code: '1221323' });
      expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('validateUsernamePassword', () => {
    let user;

    beforeEach(() => {
      userRepository.findOne = jest.fn();

      user = new User();
      user.username = 'TestUserName2';
      user.validatePassword = jest.fn();
    });

    it('should returns the username as validation successful', async function () {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(true);

      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );

      expect(result).toEqual('TestUserName2');
    });

    it('should returns null as user cannot be found', async function () {
      userRepository.findOne.mockResolvedValue(null);
      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );
      expect(user.validatePassword).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should returns null as password is invalid', async function () {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(false);
      const result = await userRepository.validateUserPassword(
        mockCredentialsDto,
      );
      expect(user.validatePassword).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('hashPassword', () => {
    it('should calls bcrypt hash to generate hash', async function () {
      bcrypt.hash = jest.fn().mockResolvedValue('testHash');

      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await userRepository.hashPassword(
        'testPassword',
        'testSalt',
      );
      expect(bcrypt.hash).toHaveBeenCalledWith('testPassword', 'testSalt');
      expect(result).toEqual('testHash');
    });
  });
});
