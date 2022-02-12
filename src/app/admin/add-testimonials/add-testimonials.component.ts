import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-add-testimonials',
  templateUrl: './add-testimonials.component.html',
  styleUrls: ['./add-testimonials.component.css'],
  providers: [ConfirmationService],
})
export class AddTestimonialsComponent implements OnInit, OnChanges {
  @Output() hideAddData = new EventEmitter<boolean>();
  @Output() hideDialog = new EventEmitter<boolean>();
  @Input() updateData;

  deleteTestimony: FormGroup;

  addTestimony = new FormGroup({
    testimonyName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    dateDisplay: new FormControl(),
    date: new FormControl(),
  });
  constructor(
    public confirmationService: ConfirmationService,
    private messageService: MessageService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {}
  ngOnChanges() {
    this.addTestimony.reset();
    this.deleteTestimony = this.updateData;
    this.addTestimony.patchValue(this.updateData);
  }

  showSaveDialog() {
    this.addTestimony.markAllAsTouched();
    if (this.addTestimony.invalid) {
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
          if (this.deleteTestimony.value !== null || undefined || {}) {
            this.firebaseService.deleteTestimony([this.deleteTestimony]);
          }
          this.firebaseService.createTestimony(this.addTestimony.value);
          this.addTestimony.reset();
          this.hideAddData.emit(false);
        },
        reject: () => {},
      });
    }
  }

  displayDate() {
    this.addTestimony.controls.dateDisplay.setValue(
      this.addTestimony.value.date
    );
  }

  close() {
    this.hideDialog.emit(false);
  }
}
