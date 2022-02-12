import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [ConfirmationService],
})
export class CoursesComponent implements OnInit {
  courseForm: FormGroup;

  selectedCourse = [];

  loading: boolean = true;

  addCourseDisplay = false;

  @ViewChild('dt') table: Table;

  updateData = [];
  constructor(
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private firebaseService: FirebaseService,
    private confirmationService: ConfirmationService
  ) {}

  courseData: any[];

  ngOnInit() {
    this.firebaseService.readCourse().subscribe((res) => this.getAll(res));
    this.primengConfig.ripple = true;
  }

  getAll(data) {
    this.courseData = data;
  }

  addCourse() {
    this.addCourseDisplay = true;
  }

  deleteCourse() {
    if (this.selectedCourse.length === 0) {
      this.messageService.add({
        key: 'addedSuccess',
        severity: 'info',
        summary: 'Please select a Course',
      });
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete the selected Courses?',
        accept: () => {
          this.firebaseService.deleteCourse(this.selectedCourse);
        },
      });
    }
  }

  changeSaveDataDisplay(value: any) {
    this.updateData = [];
    this.addCourseDisplay = false;
    this.messageService.add({
      key: 'addedSuccess',
      severity: 'success',
      summary: 'Course Added',
    });
  }

  selectedCourses(data) {
    if (
      this.selectedCourse.findIndex((course) => course.id === data.id) !== -1
    ) {
      this.selectedCourse.splice(
        this.selectedCourse.findIndex((course) => course.id == data.id),
        1
      );
    } else {
      this.selectedCourse.push(data);
    }
  }

  updateItem(data) {
    this.updateData = data;
    this.addCourseDisplay = true;
  }

  eraseData() {
    this.updateData = [];
  }
}
