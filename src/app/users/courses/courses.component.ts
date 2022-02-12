import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FirebaseService } from '../_serivces/firebase.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: any[];
  bag = [];

  categories = [{ option: null, label: 'All' }];

  categoryDisplay: boolean = true;

  allCourses = [];

  constructor(
    private firebaseService: FirebaseService,
    private messageService: MessageService
  ) {}
  ngOnDestroy(): void {
    this.categories = [];
  }

  ngOnInit(): void {
    this.courses = this.firebaseService.coursesAll;
    this.bag = this.firebaseService.bagData;
    this.allCourses = this.firebaseService.coursesAll;

    this.bag.forEach((element) => {
      if (this.allCourses.find((e) => e.id == element.id)) {
        this.allCourses.find((e) => e.id == element.id).inBag = element.inBag;
      }
    });
    this.courses.forEach((element) => {
      this.categories.push({
        option: element.category,
        label: element.category,
      });
    });

    this.firebaseService.cartObserver$.subscribe((res) => {
      this.readFromBag(res);
    });
  }

  readFromBag(data) {
    this.bag = data;
    this.courses = this.firebaseService.coursesAll;
  }

  checkIfPresentInBag(selectedCourse) {
    if (this.bag.indexOf((course) => course == selectedCourse) == -1) {
      return true;
    } else {
      return false;
    }
  }

  addToBag(data) {
    this.firebaseService.addToBag(data);
    this.messageService.add({
      key: 'success',
      severity: 'success',
      summary: 'Course Added',
    });
  }

  assignOnlyCourses(data) {
    data.forEach((element) => {
      if (this.allCourses.find((e) => e.id == element.id)) {
        element.inBag = this.allCourses.find((e) => e.id == element.id).inBag;
      }
    });
    this.courses = data;
    console.log(this.courses);
  }

  categoryChange(data) {
    this.categoryDisplay = false;
    if (data.option == null) {
      this.courses = this.firebaseService.coursesAll;
    } else {
      this.firebaseService
        .readCoursesByCategory(data.option)
        .subscribe((res) => {
          this.assignOnlyCourses(res);
        });
    }
  }

  removeFromCart(course) {
    course.inBag = false;
    this.firebaseService.removeFromBag(course);
    this.messageService.add({
      key: 'error',
      severity: 'error',
      summary: 'Course Removed',
    });
  }
}
