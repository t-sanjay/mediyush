import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuComponent } from './menu/menu.component';
import { DockModule } from 'primeng/dock';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CoursesComponent } from './courses/courses.component';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../_services/auth.service';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { BookingComponent } from './booking/booking.component';
import { UsersComponent } from './users/users.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { AdsComponent } from './ads/ads.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AddDoctorsComponent } from './add-doctors/add-doctors.component';
import { AddAdsComponent } from './add-ads/add-ads.component';
import { AddBlogsComponent } from './add-blogs/add-blogs.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AddTestimonialsComponent } from './add-testimonials/add-testimonials.component';
import { AddEventsComponent } from './add-events/add-events.component';
import { EventsComponent } from './events/events.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    MenuComponent,
    CoursesComponent,
    BookingComponent,
    UsersComponent,
    DoctorsComponent,
    AdsComponent,
    BlogsComponent,
    AddCoursesComponent,
    AddDoctorsComponent,
    AddAdsComponent,
    AddBlogsComponent,
    TestimonialsComponent,
    AddTestimonialsComponent,
    AddEventsComponent,
    EventsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MenubarModule,
    DockModule,
    CardModule,
    ButtonModule,
    TableModule,
    ProgressBarModule,
    InputTextModule,
    DropdownModule,
    TooltipModule,
    RippleModule,
    CheckboxModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    CalendarModule,
    SelectButtonModule,
    ToggleButtonModule,
    ToastModule,
    InputTextareaModule,
    FileUploadModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [AuthService],
})
export class AdminModule {}
