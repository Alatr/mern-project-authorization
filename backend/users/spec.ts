import { LoggerService } from "./../services/logger";
import "reflect-metadata";
import { Container } from "inversify";

import { IConfigService } from "./../../config/service";
import { IUserService, UserService } from "./service";
import { IUserRepository } from "./repository";
import { TYPES } from "../common/types";
import { IUserModel } from "../common/database";
import { ILogger } from "../services/logger";

const configServiceMock: IConfigService = {
  get: jest.fn(),
};

const userRepositoryMock: IUserRepository = {
  find: jest.fn(),
  create: jest.fn(),
};

const loggerMock: ILogger = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  logger: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let userRepository: IUserRepository;
let userService: IUserService;
let logger: ILogger;

beforeAll(() => {
  container.bind<IUserService>(TYPES.IUserService).to(UserService);

  container.bind<ILogger>(TYPES.ILogger).toConstantValue(loggerMock);
  container
    .bind<IConfigService>(TYPES.ConfigService)
    .toConstantValue(configServiceMock);
  container
    .bind<IUserRepository>(TYPES.UserRepository)
    .toConstantValue(userRepositoryMock);

  configService = container.get<IConfigService>(TYPES.ConfigService);
  userRepository = container.get<IUserRepository>(TYPES.UserRepository);
  userService = container.get<IUserService>(TYPES.IUserService);
  logger = container.get<ILogger>(TYPES.ILogger);
});

let createdUser: IUserModel | null = null;

beforeEach(async () => {
  configService.get = jest.fn().mockReturnValueOnce("1");
  userRepository.create = jest
    .fn()
    .mockImplementationOnce((user: IUserModel) => ({
      name: user.name,
      email: user.email,
      password: user.password,
      id: 1,
    }));
  createdUser = await userService.createUser(MOCK_REGISTER_USER);
});
afterEach(() => {
  createdUser = null;
});

const MOCK_REGISTER_USER = {
  email: "a@a.com",
  name: "lorem",
  password: "1234",
};
const MOCK_lOGIN_USER = {
  email: "a@a.com",
  password: "1234",
};

describe("User service", () => {
  it("create User", async () => {
    expect(createdUser?.id).toEqual(1);
    expect(createdUser?.password).not.toEqual(MOCK_REGISTER_USER.password);
  });
  it("validate - success", async () => {
    userRepository.find = jest.fn().mockReturnValueOnce(createdUser);

    const res = await userService.validateUser(MOCK_lOGIN_USER);
    expect(res).toBeTruthy();
  });

  it("validate - wrong password", async () => {
    userRepository.find = jest.fn().mockReturnValueOnce(createdUser);

    const res = await userService.validateUser({
      ...MOCK_lOGIN_USER,
      password: "wrong password",
    });
    expect(res).toBeFalsy();
  });

  it("validate - not found", async () => {
    userRepository.find = jest.fn().mockReturnValueOnce(null);
    const res = await userService.validateUser(MOCK_lOGIN_USER);
    expect(res).toBeFalsy();
  });
});
