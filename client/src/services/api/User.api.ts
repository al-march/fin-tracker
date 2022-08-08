import { ApiRoute, BaseApi } from '@app/services/api/base';
import { SignInResDto, UserDto } from '@app/models';

@ApiRoute('auth')
class AuthApi extends BaseApi {
  signIn(login: string, password: string) {
    return this.post<SignInResDto>('sign-in', {login, password});
  }
}

@ApiRoute('profile')
class ProfileApi extends BaseApi {
  getInfo() {
    return this.get<UserDto>('info');
  }

  update(u: Partial<UserDto>) {
    return this.put<UserDto>('info', u);
  }
}

export const authApi = new AuthApi();
export const profileApi = new ProfileApi();
