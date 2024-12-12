export type User = {
  fullname: string;
  email: string;
  username: string;
  dateOfBirth: string;
  createdAt: string;
};

export type UserWithPassword = User & { password: string };

export default User;
