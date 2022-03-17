import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  bookings: any[];
  users = [];

  bookingType = [
    { name: 'Booked Courses', value: 2 },

    { name: 'Booked Events', value: 1 },
  ];

  bookingCourse: boolean = true;

  bookingsData = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.readAllBookings().subscribe((res) => this.getAll(res));

    this.firebaseService.readUsers().subscribe((res) => {
      this.allUsers(res);
    });
  }
  getAll(data) {
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
  getAllBooking(data) {
    this.bookings = data;
  }

  allUsers(data) {
    this.users = data;
  }

  displayName(uid) {
    return this.users.filter((e) => e.uid === uid)[0].displayName;
  }

  bookingChange(event) {
    this.firebaseService
      .readAllBookings()
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
}
