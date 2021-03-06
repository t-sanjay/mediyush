import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './_services/auth.service';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { TestcompComponent } from './testcomp/testcomp.component';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotpasswordComponent,
    TestcompComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TabMenuModule,
    InputTextModule,
    FormsModule,
    ToastModule,
    AdminModule,
    UsersModule,
    RippleModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CardModule,
    OverlayModule,
  ],
  providers: [AuthService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
