import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'courses-admin', component: CoursesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
