import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TestcompComponent } from './testcomp/testcomp.component';
import { AdminGuardGuard } from './_guard/admin-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  //{ path: '', component: TestcompComponent },
  { path: 'sign-in', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'reset-password', component: ForgotpasswordComponent },
  {
    path: 'dashboard-admin',
    canActivate: [AdminGuardGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AdminGuardGuard],
})
export class AppRoutingModule {}
