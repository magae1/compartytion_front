export type ProfileType = {
  username: string;
  avatar?: string;
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

export type CompetitionSimpleType = {
  id: string;
  title: string;
  created_at: Date;
  creator: ProfileType;
  status: "모집중" | "모집 마감" | "진행중" | "완료";
  is_team_game: boolean;
  introduction?: string;
  num_of_participants: number;
  num_of_applicants: number;
};

export interface CompetitionType extends CompetitionSimpleType {
  content?: string;
}
