import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from '../service/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const localUser = this.storage.getLocalUser();
    if (localUser && !req.url.includes('amazon')) {
      const authRequest = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
      return next.handle(authRequest);
    }
    return next.handle(req);
  }
}
