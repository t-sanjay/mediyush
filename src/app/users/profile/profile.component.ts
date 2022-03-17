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

  bookings = [];

  bookingType = [
    { name: 'Booked Courses', value: 2 },

    { name: 'Booked Events', value: 1 },
  ];

  bookingCourse: boolean = true;

  bookingsData = [];

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
    this.bookings = data;
    this.bookings.forEach((res) => {
      res.courses.forEach((e) => {
        if (e.courseName) {
          e.userId = res.userId;
          e.id = res.paymentDetails.razorpay_order_id;
          e.bookedDateTime = res.bookedDateTime;

          this.bookingsData.push(e);
        }
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

  getAllBooking(data) {
    this.bookings = data;
  }

  bookingChange(event) {
    this.firebaseService
      .getMyBookings(this.user[0].uid)
      .subscribe((res) => this.getAllBooking(res));
    this.bookingsData = [];
    if (event.value.value == 2) {
      this.bookingCourse = true;
      this.bookings.forEach((res) => {
        res.courses.forEach((e) => {
          if (e.courseName) {
            e.userId = res.userId;
            e.id = res.paymentDetails.razorpay_order_id;
            e.bookedDateTime = res.bookedDateTime;

            this.bookingsData.push(e);
          }
        });
      });
    } else {
      this.bookingCourse = false;
      this.bookings.forEach((res) => {
        res.courses.forEach((e) => {
          if (e.eventName) {
            e.userId = res.userId;
            e.id = res.paymentDetails.razorpay_order_id;
            e.bookedDateTime = res.bookedDateTime;
            this.bookingsData.push(e);
          }
        });
      });
    }
    this.bookings = [];
    this.bookings = this.bookingsData;
    console.log(this.bookingsData);
  }

  displayName(uid) {
    return this.user.filter((e) => e.uid === uid)[0].displayName;
  }
}
