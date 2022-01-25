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

@NgModule({
  declarations: [AdminDashboardComponent, MenuComponent, CoursesComponent],
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
  ],
  providers: [AuthService],
})
export class AdminModule {}
