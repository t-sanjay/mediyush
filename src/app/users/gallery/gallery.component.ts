import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MessageService } from 'primeng/api';
import { FirebaseService } from '../_serivces/firebase.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  eventsData = [];

  constructor(
    private firebaseService: FirebaseService,
    private afStorage: AngularFireStorage,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.eventsData = this.firebaseService.eventsAll;
  }

  addToBag(event) {
    this.firebaseService.addToBagEvents(event);
    this.messageService.add({
      key: 'success',
      severity: 'success',
      summary: 'Course Added',
    });
  }

  removeFromCart(course) {
    course.inBag = false;
    this.firebaseService.removeFromBagEvents(course);
    this.messageService.add({
      key: 'error',
      severity: 'error',
      summary: 'Course Removed',
    });
  }
}
