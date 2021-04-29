import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/auth/auth-guard.service';


const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(home => home.HomeModule)
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then(signin => signin.SigninModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(signup => signup.SignupModule)
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(notFound => notFound.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
