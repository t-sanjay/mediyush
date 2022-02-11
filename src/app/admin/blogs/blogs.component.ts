import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  providers: [ConfirmationService],
})
export class BlogsComponent implements OnInit {
  blogsData: any[];
  addBlogsDisplay: boolean = false;
  selectedBlog = [];
  constructor(
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private firebaseService: FirebaseService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.firebaseService.readBlogs().subscribe((res) => this.getAll(res));
    this.primengConfig.ripple = true;
  }

  getAll(data) {
    this.blogsData = data;
    console.log(this.blogsData);
  }

  addBlog() {
    this.addBlogsDisplay = true;
  }

  deleteBlog() {
    if (this.selectedBlog.length === 0) {
      this.messageService.add({
        key: 'addedSuccess',
        severity: 'info',
        summary: 'Please select a Ad',
      });
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete the selected Ads?',
        accept: () => {
          this.firebaseService.deleteBlogs(this.selectedBlog);
        },
      });
    }
  }

  changeSaveDataDisplay(data) {
    this.addBlogsDisplay = false;
    this.messageService.add({
      key: 'addedSuccess',
      severity: 'success',
      summary: 'Course Added',
    });
  }

  selectedBlogs(data) {
    if (this.selectedBlog.findIndex((course) => course.id === data.id) !== -1) {
      this.selectedBlog.splice(
        this.selectedBlog.findIndex((course) => course.id == data.id),
        1
      );
    } else {
      this.selectedBlog.push(data);
    }
  }
}
