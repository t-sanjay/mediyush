import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdsComponent } from './ads/ads.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BookingComponent } from './booking/booking.component';
import { CoursesComponent } from './courses/courses.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { EventsComponent } from './events/events.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'courses-admin', component: CoursesComponent },
  { path: 'booking-admin', component: BookingComponent },
  { path: 'users-admin', component: UsersComponent },
  { path: 'doctors-admin', component: DoctorsComponent },
  { path: 'blogs-admin', component: BlogsComponent },
  { path: 'ads-admin', component: AdsComponent },
  { path: 'testimonials-admin', component: TestimonialsComponent },
  { path: 'events-admin', component: EventsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
