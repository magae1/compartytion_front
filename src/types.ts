export type ProfileType = {
  account: string;
  avatar: string | null;
  introduction: string | null;
  displayed_name: string | null;
  hidden_name: string | null;
};

export type AccountType = {
  id: number;
  email: string;
  username: string;
  last_password_changed: Date;
  profile: ProfileType;
};
