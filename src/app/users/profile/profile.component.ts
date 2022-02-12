import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userMed'));
    this.firebaseService.getUserDetails(this.user.uid).subscribe((res) => {
      this.getUser(res);
    });
    this.firebaseService.getMyBookings(this.user.uid).subscribe((res) => {
      this.getRawBookingsData(res);
    });
  }

  getUser(data) {
    this.user = data;
    console.log(this.user);
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

  updateUserData() {
    this.firebaseService.updateUserName(this.updateAccountDetails);
    this.messageService.add({
      severity: 'success',
      summary: 'Details Updated',
      detail: 'Name is updated',
    });
  }
}
