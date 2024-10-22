export type SimpleProfileType = {
  username: string;
  avatar?: string;
};

export type ProfileType = SimpleProfileType & {
  introduction?: string;
  displayed_name?: string;
  hidden_name?: string;
};

export type AccountType = {
  id: number;
  email: string;
  username: string;
  last_password_changed: Date;
  profile: ProfileType;
};

export type SimpleCompetitionType = {
  id: string;
  title: string;
  created_at: Date;
  creator: ProfileType;
  status: "모집중" | "모집 마감" | "진행중" | "완료";
  is_team_game: boolean;
  introduction?: string;
};

export type CompetitionType = SimpleCompetitionType & {
  content?: string;
  is_manager: boolean;
  creator_nickname: string;
  num_of_participants: number;
  num_of_applicants: number;
};
