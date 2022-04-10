import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FirebaseService } from '../_serivces/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: any[];
  bag = [];

  categories = [
    { option: null, label: 'All' },
    { option: 'MBBS', label: 'MBBS' },
    { option: 'BDS', label: 'BDS' },
    { option: 'BAMS', label: 'BAMS' },
    { option: 'BHMS', label: 'BHMS' },
    { option: 'Paramedical', label: 'Paramedical' },
    { option: 'TIA Academy', label: 'TIA Academy' },
  ];

  categoryDisplay: boolean = true;

  allCourses = [];

  isReadMore: boolean;

  constructor(
    private firebaseService: FirebaseService,
    private messageService: MessageService,
    private afStorage: AngularFireStorage
  ) {}
  ngOnDestroy(): void {
    this.categories = [];
  }

  ngOnInit(): void {
    this.courses = this.firebaseService.coursesAll;
    this.bag = this.firebaseService.bagData;
    this.allCourses = this.firebaseService.coursesAll;

    if (this.bag !== undefined) {
      this.bag.forEach((element) => {
        if (this.allCourses.find((e) => e.id == element.id)) {
          this.allCourses.find((e) => e.id == element.id).inBag = element.inBag;
        }
      });
    }

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
  }

  assignOnlyCourses(data) {
    data.forEach((element) => {
      if (this.allCourses.find((e) => e.id == element.id)) {
        element.inBag = this.allCourses.find((e) => e.id == element.id).inBag;
      }
    });
    data.forEach((element) => {
      this.afStorage
        .ref(element.fileName)
        .getDownloadURL()
        .subscribe((res) => {
          element.fileName = res;
        });
    });
    this.courses = data;
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
