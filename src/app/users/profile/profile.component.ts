import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../_serivces/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;

  userBookingsRaw = [];
  userBookings = [];
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userMed'));
    console.log(this.user);

    this.firebaseService.getMyBookings(this.user.uid).subscribe((res) => {
      this.getRawBookingsData(res);
    });
  }

  getRawBookingsData(data) {
    this.userBookingsRaw = data;
    console.log(this.userBookingsRaw);
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
    console.log(this.userBookings);
  }
}
