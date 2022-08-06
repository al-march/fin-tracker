import { ApiRoute, BaseApi } from '@app/services/api/base';
import { SignInResDto } from '@app/dto';

@ApiRoute('auth')
class AuthApi extends BaseApi {
  signIn(login: string, password: string) {
    return this.post<SignInResDto>('sign-in', {login, password});
  }
}

@ApiRoute('profile')
class ProfileApi extends BaseApi {

}

export const authApi = new AuthApi();
export const profileApi = new ProfileApi();
