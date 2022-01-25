import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userMed'));
    if (user !== null) {
      this.authService.getUserData(user).subscribe((res) => {
        if (res.admin) {
          this.route.navigateByUrl('dashboard-admin');
        } else {
          this.route.navigateByUrl('dashboard');
        }
      });
    }
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.authService
      .signIn(this.loginForm.value.email, this.loginForm.value.password)
      .then((result) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
        });
        this.authService.getUserData(result.user).subscribe((res) => {
          if (res.admin) {
            this.route.navigateByUrl('dashboard-admin');
          } else {
            this.route.navigateByUrl('dashboard');
          }
        });
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: error.message,
        });
      });
  }
}
