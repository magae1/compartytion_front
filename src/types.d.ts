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

export type ApplicantType = {
  id: number;
  profile: SimpleProfileType | null;
  email: string;
  displayed_name: string;
  hidden_name: string;
  introduction: string;
  applied_at: Date;
};

export type ManagerType = {
  id: number;
  profile: SimpleProfileType;
  nickname: string;
  handle_rules: boolean;
  handle_content: boolean;
  handle_applicants: boolean;
  handle_participants: boolean;
  accepted: boolean;
};

export type SimpleParticipantType = {
  id: number;
  profile: SimpleProfileType | null;
  order: number;
  displayed_name: string;
};

export type ParticipantType = {
  hidden_name: string;
  introduction: string;
  joined_at: Date;
  last_login_at: Date;
} & SimpleParticipantType;

export type ActionResType<V, E> = {
  value: V;
  message: E;
  isError: boolean;
};
