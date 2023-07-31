interface User {
  name: string;
}

class UserService {
  constructor() {}
  public get(userId: string): Promise<User | undefined> {
    return Promise.resolve({ name: `John${userId}` });
  }
}
// dummy by anonymous class
const dummyByAnonymousClass = new (class {
  constructor() {}
  public get(userId: string): Promise<User | undefined> {
    return Promise.resolve({ name: `John${userId}` });
  }
})() as UserService;

// dummy by object
const dummyByObject = {
  get: (userId: string): Promise<User | undefined> => {
    return Promise.resolve({ name: `John${userId}` });
  },
} as UserService;

describe("UserService", () => {
  it("should return a user", async () => {
    const userService = new UserService();
    const actual = await userService.get("1");
    expect(actual).toEqual({ name: "John1" });
  });

  it("dummy by anonymous should return a user", async () => {
    const actual = await dummyByAnonymousClass.get("1");
    expect(actual).toEqual({ name: "John1" });
  });

  it("dummy by object should return a user", async () => {
    const actual = await dummyByObject.get("1");
    expect(actual).toEqual({ name: "John1" });
  });
});
