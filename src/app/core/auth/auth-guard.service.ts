import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ClienteService} from '../../service/model/cliente.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private clienteService: ClienteService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean |
    UrlTree> | boolean | UrlTree {
    this.clienteService.isLogged().subscribe((logged) => {
      if (logged) {
        this.clienteService.isAllowed().subscribe((allowed) => {
          if (allowed) {
            this.router.navigate(['home']);
            return false;
          }
        });
      }
    });
    return true;
  }
}
