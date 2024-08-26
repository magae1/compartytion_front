export interface StepProps {
  userId: number;
}

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

export type CompetitionSimpleType = {
  id: string;
  title: string;
  created_at: Date;
  creator: ProfileType;
  status: string;
  is_team_game: boolean;
  introduction?: string;
};

export interface CompetitionType extends CompetitionSimpleType {
  managers: ProfileType[];
  rule?: string;
  tournament?: string;
  content?: string;
}

export type CompetitionCreationStoreType = {
  activeStep: number;
  data: {
    title: string;
    introduction: string;
    rule: {
      content: {};
    };
    tournament: {};
    content: {};
    is_team_game: boolean;
  };
};
