import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (!this.forgotPasswordForm.invalid) {
      this.authService.resetPassword(this.forgotPasswordForm.value.email);
      this.messageService.add({
        severity: 'success',
        summary:
          'Please check your email!! A link to reset the password has been sent!',
      });
    }
  }
}
