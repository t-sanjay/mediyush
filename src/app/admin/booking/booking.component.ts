import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  bookings: any[];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.readAllBookings().subscribe((res) => this.getAll(res));
  }
  getAll(data) {
    this.bookings = data;
    console.log(this.bookings);
  }
}
