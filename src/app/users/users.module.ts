import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersDashboardComponent } from './users-dashboard/users-dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { ButtonModule } from 'primeng/button';
import { DockModule } from 'primeng/dock';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CarouselModule } from 'primeng/carousel';
import { FooterComponent } from './footer/footer.component';
import { CoursesComponent } from './courses/courses.component';
import { BlogsComponent } from './blogs/blogs.component';
import { SidebarModule } from 'primeng/sidebar';
import { FileUploadModule } from 'primeng/fileupload';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  declarations: [
    UsersDashboardComponent,
    MenuComponent,
    FooterComponent,
    CoursesComponent,
    BlogsComponent,
    CourseDetailsComponent,
    ProfileComponent,
    CartComponent,
    GalleryComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    UsersRoutingModule,
    CommonModule,
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
    CarouselModule,
    SidebarModule,
    FileUploadModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
})
export class UsersModule {}
