import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { Table } from 'primeng/table';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [ConfirmationService],
})
export class EventsComponent implements OnInit {
  addEventDisplay: boolean = false;
  selectedEvent = [];
  eventsData = [];

  @ViewChild('dt') table: Table;
  updateData = [];

  constructor(
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private firebaseService: FirebaseService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.firebaseService.readEvents().subscribe((res) => this.getAll(res));
    this.primengConfig.ripple = true;
  }

  getAll(data) {
    this.eventsData = data;
  }

  deleteEvents() {
    if (this.selectedEvent.length === 0) {
      this.messageService.add({
        key: 'addedSuccess',
        severity: 'info',
        summary: 'Please select a Course',
      });
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete the selected Courses?',
        accept: () => {
          this.firebaseService.deleteEvent(this.selectedEvent);
        },
      });
    }
  }

  addEvents() {
    this.addEventDisplay = true;
  }

  selectedEvents(data) {
    console.log(data);
    if (
      this.selectedEvent.findIndex((course) => course.id === data.id) !== -1
    ) {
      this.selectedEvent.splice(
        this.selectedEvent.findIndex((course) => course.id == data.id),
        1
      );
    } else {
      this.selectedEvent.push(data);
    }
    console.log(this.selectedEvent);
  }

  changeSaveDataDisplay(value: any) {
    this.addEventDisplay = false;
    this.messageService.add({
      key: 'addedSuccess',
      severity: 'success',
      summary: 'Course Added',
    });
  }

  updateItem(data) {
    this.updateData = data;
    this.addEventDisplay = true;
  }

  eraseData() {
    this.updateData = [];
  }
}
