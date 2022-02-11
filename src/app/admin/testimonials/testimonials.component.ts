import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { Table } from 'primeng/table';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
  providers: [ConfirmationService],
})
export class TestimonialsComponent implements OnInit {
  addTestimonyDisplay = false;

  testimonyData: any[];

  selectedTestimony = [];

  @ViewChild('dt') table: Table;

  constructor(
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.firebaseService
      .readTestimony()
      .subscribe((res) => this.getAllTestimony(res));
  }

  getAllTestimony(data) {
    this.testimonyData = data;
  }

  deleteTestimony() {
    if (this.selectedTestimony.length === 0) {
      this.messageService.add({
        key: 'addedSuccess',
        severity: 'info',
        summary: 'Please select a Testimony',
      });
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete the selected Testimony?',
        accept: () => {
          this.firebaseService.deleteTestimony(this.selectedTestimony);
        },
      });
    }
  }

  addTestimony() {
    this.addTestimonyDisplay = true;
  }

  selectedTestimonies(data) {
    if (
      this.selectedTestimony.findIndex((course) => course.id === data.id) !== -1
    ) {
      this.selectedTestimony.splice(
        this.selectedTestimony.findIndex((course) => course.id == data.id),
        1
      );
    } else {
      this.selectedTestimony.push(data);
    }
  }

  changeSaveDataDisplay(data) {
    this.addTestimonyDisplay = false;
    this.messageService.add({
      key: 'addedSuccess',
      severity: 'success',
      summary: 'Testimony Added',
    });
  }
}
