import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signUpForm = new FormGroup({
      displayName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      uid: new FormControl(''),
      admin: new FormControl(false),
    });
  }

  onSubmit() {
    this.authService
      .signUp(this.signUpForm.value.email, this.signUpForm.value.password)
      .then((result) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sign-up Successful, You are redirected to sign in page!!',
        });
        this.signUpForm.controls.uid.setValue(result.user.uid);
        console.log(this.signUpForm);
        this.authService.setUserData(this.signUpForm.value);
        this.router.navigateByUrl('sign-in');
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: error.message,
        });
      });
  }
}
