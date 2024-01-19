const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");

it("user should be created", async () => {
  const user = {
    name: "John Doe",
    email: "jLz6S@example.com",
    password: "123456"
  };

  const userRepositoryInMemory = new UserRepositoryInMemory();
  const userCreateService = new UserCreateService(userRepositoryInMemory);
  const userCreated = await userCreateService.execute(user);

  expect(userCreated).toHaveProperty("id");
});