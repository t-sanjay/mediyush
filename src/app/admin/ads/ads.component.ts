import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css'],
  providers: [ConfirmationService],
})
export class AdsComponent implements OnInit {
  addAdsDisplay: any;
  adsData: any[];
  selectedAd = [];

  updateData = [];

  constructor(
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private firebaseService: FirebaseService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.firebaseService.readAds().subscribe((res) => this.getAll(res));
  }

  getAll(data) {
    this.adsData = data;
    console.log(this.adsData);
  }

  deleteAd() {
    if (this.selectedAd.length === 0) {
      this.messageService.add({
        key: 'addedSuccess',
        severity: 'info',
        summary: 'Please select an Ad',
      });
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete the selected Ads?',
        accept: () => {
          this.firebaseService.deleteAds(this.selectedAd);
        },
      });
    }
  }

  addAds() {
    this.addAdsDisplay = true;
  }
  changeSaveDataDisplay(data) {
    this.updateData = [];
    this.addAdsDisplay = false;
    this.messageService.add({
      key: 'addedSuccess',
      severity: 'success',
      summary: 'Ad Added',
    });
  }

  selectedAds(data) {
    if (this.selectedAd.findIndex((course) => course.id === data.id) !== -1) {
      this.selectedAd.splice(
        this.selectedAd.findIndex((course) => course.id == data.id),
        1
      );
    } else {
      this.selectedAd.push(data);
    }
  }

  updateItem(data) {
    this.updateData = data;
    this.addAdsDisplay = true;
  }

  eraseData() {
    this.updateData = [];
  }
}
