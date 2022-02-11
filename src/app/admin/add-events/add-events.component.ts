import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css'],
})
export class AddEventsComponent implements OnInit {
  @Output() hideAddData = new EventEmitter<boolean>();
  @Output() hideDialog = new EventEmitter<boolean>();

  addEvents = new FormGroup({
    eventName: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    venue: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required),
    fileName: new FormControl(''),
    dateDisplay: new FormControl(''),
  });

  constructor(
    public confirmationService: ConfirmationService,
    private messageService: MessageService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {}

  showSaveDialog() {
    this.addEvents.markAllAsTouched();
    if (this.addEvents.invalid) {
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
          this.firebaseService.createEvent(this.addEvents.value);
          this.addEvents.reset();
          this.hideAddData.emit(false);
        },
        reject: () => {},
      });
    }
  }
  uploadImages($event) {
    this.addEvents.controls.fileName.setValue(
      this.firebaseService.uploadFileEvents($event)
    );
  }

  displayDate() {
    this.addEvents.controls.dateDisplay.setValue(this.addEvents.value.date);
  }

  close() {
    this.hideDialog.emit(false);
  }
}
