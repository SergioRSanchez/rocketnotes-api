const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService", () => {
  let userRepositoryInMemory = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  });

  it("user should be created", async () => {
    const user = {
      name: "John Doe",
      email: "jLz6S@example.com",
      password: "123456"
    };

    const userCreated = await userCreateService.execute(user);

    expect(userCreated).toHaveProperty("id");
  });

  it("user should not be created with existing email", async () => {
    const user1 = {
      name: "John Doe",
      email: "jLz6S@example.com",
      password: "123456"
    };

    const user2 = {
      name: "Jose Doe",
      email: "jLz6S@example.com",
      password: "123"
    };

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso"));
  })
})