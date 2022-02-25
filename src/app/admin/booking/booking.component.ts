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
    { name: 'Booked Events', value: 1 },
    { name: 'Booked Courses', value: 2 },
  ];

  bookingCourse: boolean = false;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.readAllBookings().subscribe((res) => this.getAll(res));
    this.firebaseService.readUsers().subscribe((res) => {
      this.allUsers(res);
    });
  }
  getAll(data) {
    this.bookings = data;
  }

  allUsers(data) {
    this.users = data;
  }

  displayName(uid) {
    return this.users.filter((e) => e.uid === uid)[0].displayName;
  }

  bookingChange(event) {
    console.log(event.value.value);

    if (event.value.value == 2) {
      this.bookingCourse = true;
    } else {
      this.bookingCourse = false;
    }
  }
}
