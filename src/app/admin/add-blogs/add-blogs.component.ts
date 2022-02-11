import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-add-blogs',
  templateUrl: './add-blogs.component.html',
  styleUrls: ['./add-blogs.component.css'],
  providers: [ConfirmationService],
})
export class AddBlogsComponent implements OnInit {
  @Output() hideAddData = new EventEmitter<boolean>();
  @Output() hideDialog = new EventEmitter<boolean>();

  addBlog = new FormGroup({
    blogName: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    fileName: new FormControl(),
  });
  constructor(
    public confirmationService: ConfirmationService,
    private messageService: MessageService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {}

  showSaveDialog() {
    this.addBlog.markAllAsTouched();
    if (this.addBlog.invalid) {
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
          this.firebaseService.createBlog(this.addBlog.value);
          this.addBlog.reset();
          this.hideAddData.emit(false);
        },
        reject: () => {},
      });
    }
  }

  uploadImages($event) {
    this.addBlog.controls.fileName.setValue(
      this.firebaseService.uploadFileBlog($event)
    );
  }

  close() {
    this.hideDialog.emit(false);
  }
}
