import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { FirebaseService } from '../_serivces/firebase.service';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css'],
})
export class UsersDashboardComponent implements OnInit, OnDestroy {
  ads: any[];
  courses: any[];
  testimonies: any[];
  categories = [];

  partners = [
    '../../../assets/images/partners/partners (1).png',
    '../../../assets/images/partners/partners.png',
  ];

  constructor(
    private firebaseService: FirebaseService,
    private afStorage: AngularFireStorage,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.categories = [];
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userMed'));
    if (user) {
      this.authService.getUserData(user).subscribe((res) => {
        if (res.admin) {
          this.router.navigateByUrl('dashboard-admin');
        } else {
          this.router.navigateByUrl('dashboard');
        }
      });
    }

    this.firebaseService.readAds().subscribe((res) => {
      this.getAdsData(res);
    });

    this.firebaseService.readCourses().subscribe((res) => {
      this.getCoursesData(res);
    });

    this.firebaseService.readAllTestimony().subscribe((res) => {
      this.getTestimonyData(res);
    });
  }

  getCoursesData(data) {
    this.courses = data;
    this.courses.forEach((element) => {
      this.afStorage
        .ref(element.fileName)
        .getDownloadURL()
        .subscribe((res) => {
          element.fileName = res;
        });
    });
    this.courses.forEach((element) => {
      this.categories.push({
        option: element.category,
        label: element.category,
      });
    });
  }

  getAdsData(data) {
    this.ads = data;

    this.ads.forEach((element) => {
      this.afStorage
        .ref(element.fileName)
        .getDownloadURL()
        .subscribe((res) => {
          element.fileName = res;
        });
    });
  }

  getTestimonyData(data) {
    this.testimonies = data;
  }
}
