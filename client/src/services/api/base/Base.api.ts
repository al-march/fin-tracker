import { http } from '@app/services/http';

export abstract class BaseApi {
  protected http = http;

  protected get url() {
    return '';
  }

  protected get<T>(path: string = '') {
    return this.http.get<T>(this.getRoute(path));
  }

  protected post<T>(path: string = '', data: any) {
    return this.http.post<T>(this.getRoute(path), data);
  }

  protected put<T>(path: string = '', data: any) {
    return this.http.put<T>(this.getRoute(path), data);
  }

  private getRoute(path: string = '') {
    return this.url + path;
  }
}
