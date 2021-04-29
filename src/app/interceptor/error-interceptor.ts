import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {StorageService} from '../service/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {


  constructor(private storage: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError((error: HttpErrorResponse) => {
          let errorHttp = error;
          if (errorHttp.error) {
            errorHttp = error.error;
          }
          switch (error.status) {
            case 403:
              this.handle403();
              break;
            case 401:
              this.handle401();
              break;
            case 422:
              this.handle422(error);
              break;
            default:
              this.handleDefultError(error);
          }
          return throwError(errorHttp);
        })
      );
  }

  handle403(): void {
    this.storage.setLocalUser(null);
  }

  handle401(): void {
    alert('Error 401: Authentication failure');
  }

  handleDefultError(error: HttpErrorResponse): void {
    alert('Error ' + error.status + ': ' + error.message);
  }

  handle422(error: HttpErrorResponse): void {
    alert('Error 422: Validation');
  }
}
