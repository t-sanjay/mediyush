import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseService } from '../_serivces/firebase.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogsData: any[];

  constructor(
    private firebaseService: FirebaseService,
    private afStorage: AngularFireStorage
  ) {
    this.firebaseService.readAllBlogs().subscribe((res) => this.getData(res));
  }

  ngOnInit(): void {}

  getData(data) {
    this.blogsData = data;
    this.blogsData.forEach((element) => {
      this.afStorage
        .ref(element.fileName)
        .getDownloadURL()
        .subscribe((res) => {
          element.fileName = res;
        });
    });
  }
}
