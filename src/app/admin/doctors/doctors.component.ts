import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { Table } from 'primeng/table';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
  providers: [ConfirmationService],
})
export class DoctorsComponent implements OnInit {
  doctors: any[];
  addDoctorDisplay: boolean = false;
  doctorsData: any[];
  selectedDoctor = [];

  @ViewChild('dt') table: Table;

  constructor(
    private firebaseService: FirebaseService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.firebaseService.readDoctors().subscribe((res) => this.getAll(res));
    this.primengConfig.ripple = true;
  }

  getAll(data) {
    this.doctorsData = data;
    console.log(this.doctorsData);
  }

  addDoctor() {
    this.addDoctorDisplay = true;
  }

  deleteDoctor() {
    if (this.selectedDoctor.length === 0) {
      this.messageService.add({
        key: 'addedSuccess',
        severity: 'info',
        summary: 'Please select a Course',
      });
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete the selected Courses?',
        accept: () => {
          this.firebaseService.deleteDoctors(this.selectedDoctor);
        },
      });
    }
  }

  changeSaveDataDisplay(value: any) {
    this.addDoctorDisplay = false;
    this.messageService.add({
      key: 'addedSuccess',
      severity: 'success',
      summary: 'Course Added',
    });
  }

  selectedDoctors(data) {
    if (
      this.selectedDoctor.findIndex((course) => course.id === data.id) !== -1
    ) {
      this.selectedDoctor.splice(
        this.selectedDoctor.findIndex((course) => course.id == data.id),
        1
      );
    } else {
      this.selectedDoctor.push(data);
    }
  }
}
