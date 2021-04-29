import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {LocalUser} from '../../model/local-user';
import {Observable} from 'rxjs';
import {StorageService} from '../storage.service';
import {environment} from '../../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  helper = new JwtHelperService();
  tokenAuthorization = '';

  constructor(private httpClient: HttpClient, private storage: StorageService) {
  }

  authenticate(username: string, password: string): Observable<any> {
    return this.httpClient.post(API_URL + '/login',
      {
        email: username,
        senha: password
      },
      {
        observe: 'response',
        responseType: 'text'
      }).pipe(tap(resposta => {
      this.sucessfulLogin(resposta.headers.get('Authorization'));
    }));
  }

  refreshToken(): Observable<any> {
    return this.httpClient.post(API_URL + '/auth/refreshToken',
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  sucessfulLogin(authorizationValue: string): void {
    this.tokenAuthorization = authorizationValue.substring(7);
    const user: LocalUser = {
      token: this.tokenAuthorization,
      email: this.helper.decodeToken(this.tokenAuthorization).sub
    };
    this.storage.setLocalUser(user);
  }

  logout(): void {
    this.storage.setLocalUser(null);
  }

  getEmail(): string {
    return this.helper.decodeToken(this.tokenAuthorization).sub;
  }

}
