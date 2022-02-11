import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { CartComponent } from './cart/cart.component';
import { CoursesComponent } from './courses/courses.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersDashboardComponent } from './users-dashboard/users-dashboard.component';

const routes: Routes = [
  { path: '', component: UsersDashboardComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'cart', component: CartComponent },
  { path: 'gallery', component: GalleryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
