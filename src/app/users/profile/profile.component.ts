import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FirebaseService } from '../_serivces/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;

  updateAccountDetails = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
  });
  userBookingsRaw = [];
  userBookings = [];

  @ViewChild('dt') table: Table;

  constructor(
    private firebaseService: FirebaseService,
    private messageService: MessageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userMed'));

    if (this.user == null) {
      this.route.navigateByUrl('/sign-in');
    }
    this.firebaseService.getUserDetails(this.user.uid).subscribe((res) => {
      this.getUser(res);
    });
    this.firebaseService.getMyBookings(this.user.uid).subscribe((res) => {
      this.getRawBookingsData(res);
    });
  }

  getUser(data) {
    this.user = data;
  }

  getRawBookingsData(data) {
    this.userBookingsRaw = data;

    this.userBookingsRaw.forEach((element) => {
      element.courses.forEach((courses) => {
        this.userBookings.push({
          courseName: courses.courseName,
          category: courses.category,
          host: courses.host,
          duration: courses.duration,
          date: courses.date,
          price: courses.price,
          orderId: element.paymentDetails.razorpay_order_id,
        });
      });
    });
  }

  updateUserData() {
    this.firebaseService.updateUserName(this.updateAccountDetails);
    this.messageService.add({
      severity: 'success',
      summary: 'Details Updated',
      detail: 'Name is updated',
    });
  }
}
