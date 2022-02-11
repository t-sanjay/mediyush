import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css'],
  providers: [ConfirmationService],
})
export class AddCoursesComponent implements OnInit, OnChanges {
  @Output() hideAddData = new EventEmitter<boolean>();
  @Output() hideDialog = new EventEmitter<boolean>();
  @Input() updateData;

  deleteCourse: FormGroup;

  addCourse = new FormGroup({
    courseName: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    host: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    dateDisplay: new FormControl({ value: '', disabled: true }),
    duration: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl(''),
    showOnFirstPage: new FormControl(false),
    status: new FormControl(true),
    fileName: new FormControl(),
  });

  constructor(
    private fb: FormBuilder,
    public confirmationService: ConfirmationService,
    private messageService: MessageService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {}
  ngOnChanges() {
    this.deleteCourse = this.updateData;
    this.addCourse.patchValue(this.updateData);
    this.updateData = [];
  }

  displayDate() {
    this.addCourse.controls.dateDisplay.setValue(this.addCourse.value.date);
  }

  showSaveDialog() {
    this.addCourse.markAllAsTouched();
    if (this.addCourse.invalid) {
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
          if (this.deleteCourse.value !== null || undefined || {}) {
            this.firebaseService.deleteCourse([this.deleteCourse]);
          }
          this.firebaseService.createCourse(this.addCourse.value);
          this.addCourse.reset();
          this.hideAddData.emit(false);
        },
        reject: () => {},
      });
    }
  }

  uploadImages($event) {
    this.addCourse.controls.fileName.setValue(
      this.firebaseService.uploadFileCourse($event)
    );
  }

  close() {
    this.hideDialog.emit(false);
  }
}
