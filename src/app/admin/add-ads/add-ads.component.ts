import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.css'],
  providers: [ConfirmationService],
})
export class AddAdsComponent implements OnInit {
  @Output() hideAddData = new EventEmitter<boolean>();
  @Output() hideDialog = new EventEmitter<boolean>();

  addAds = new FormGroup({
    adsName: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl(true, Validators.required),
    fileName: new FormControl('', Validators.required),
  });
  constructor(
    public confirmationService: ConfirmationService,
    private messageService: MessageService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {}

  showSaveDialog() {
    this.addAds.markAllAsTouched();
    if (this.addAds.invalid) {
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
          this.firebaseService.createAd(this.addAds.value);
          this.addAds.reset();
          this.hideAddData.emit(false);
        },
        reject: () => {},
      });
    }
  }

  uploadImages($event) {
    this.addAds.controls.fileName.setValue(
      this.firebaseService.uploadFile($event)
    );
  }

  close() {
    this.hideDialog.emit(false);
  }
}
