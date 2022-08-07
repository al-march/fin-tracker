export interface UserDto {
  id: number;
  createdAt: string;
  email: string;
  firstname: string;
  login: string;
  settings: UserSettingsDto;
  surname: string;
  updatedAt: string;
}

export interface UserSettingsDto {
  monthIncome: number;
  monthOutcome: number;
}

export interface SignInResDto {
  token: string;
  user: UserDto;
}
