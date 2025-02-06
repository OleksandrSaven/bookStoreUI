import {Routes} from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {RegistrationPageComponent} from './pages/registration-page/registration-page.component';
import {SearchPageComponent} from './pages/search-page/search-page.component';
import {LayoutComponent} from './common-ui/layout/layout.component';
import {canActivateAuth} from './auth/accsess.guard';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: SearchPageComponent},
    ], canActivate: [canActivateAuth]
  },
  {path: 'login', component: LoginPageComponent},
  {path: 'registration', component: RegistrationPageComponent},
];
