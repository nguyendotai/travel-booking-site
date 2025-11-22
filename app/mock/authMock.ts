export const loginMock = async (email: string, password: string) => {
  await new Promise((r) => setTimeout(r, 500));

  if (email === "test@gmail.com" && password === "123456") {
    return {
      token: "mock-token-123",
      user: {
        id: 1,
        name: "Mock User",
        email: "test@gmail.com",
      },
    };
  }

  throw new Error("Sai tài khoản hoặc mật khẩu (mock)");
};

export const updateProfileMock = async (userData: any) => {
  await new Promise((r) => setTimeout(r, 500));

  return {
    id: 1,
    name: userData.name || "Mock User",
    email: "test@gmail.com",
  };
};
