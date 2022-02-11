import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-add-doctors',
  templateUrl: './add-doctors.component.html',
  styleUrls: ['./add-doctors.component.css'],
  providers: [ConfirmationService],
})
export class AddDoctorsComponent implements OnInit {
  @Output() hideAddData = new EventEmitter<boolean>();
  @Output() hideDialog = new EventEmitter<boolean>();

  addDoctor = new FormGroup({
    doctorsName: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });
  constructor(
    public confirmationService: ConfirmationService,
    private messageService: MessageService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {}

  createForm() {}

  showSaveDialog() {
    this.addDoctor.markAllAsTouched();
    if (this.addDoctor.invalid) {
      this.messageService.add({
        key: 'required',
        severity: 'error',
        summary: 'Fields Required',
        detail: 'Enter all the required fields',
      });
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Save the data?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.firebaseService.createDoctor(this.addDoctor.value);
          this.addDoctor.reset();
          this.hideAddData.emit(false);
        },
        reject: () => {},
      });
    }
  }
  close() {
    this.hideDialog.emit(false);
  }
}
