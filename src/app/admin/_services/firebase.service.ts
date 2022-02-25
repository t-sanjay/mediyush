import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  title = 'cloudsSorage';
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  constructor(
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {}

  createCourse(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('courses')
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }

  readCourse() {
    return this.firestore.collection('courses').valueChanges({ idField: 'id' });
  }

  deleteCourse(data) {
    return data.forEach((element) => {
      this.firestore.collection('courses').doc(element.id).delete();
    });
  }

  readUsers() {
    return this.firestore.collection('users').valueChanges({ idField: 'id' });
  }

  createDoctor(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('doctors')
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }

  readDoctors() {
    return this.firestore.collection('doctors').valueChanges({ idField: 'id' });
  }

  deleteDoctors(data) {
    return data.forEach((element) => {
      this.firestore.collection('doctors').doc(element.id).delete();
    });
  }

  async createAd(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('ads')
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }

  readAds() {
    return this.firestore.collection('ads').valueChanges({ idField: 'id' });
  }

  deleteAds(data) {
    return data.forEach((element) => {
      this.firestore.collection('ads').doc(element.id).delete();
    });
  }

  createBlog(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('blogs')
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }

  readBlogs() {
    return this.firestore.collection('blogs').valueChanges({ idField: 'id' });
  }

  deleteBlogs(data) {
    return data.forEach((element) => {
      this.firestore.collection('blogs').doc(element.id).delete();
    });
  }

  uploadFile(event) {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    this.ref = this.afStorage.ref('/ads/' + randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(event.target.files[0]);

    return '/ads/' + randomId;
  }

  uploadFileCourse(event) {
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    this.ref = this.afStorage.ref('/courses/' + randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(event.target.files[0]);

    return '/courses/' + randomId;
  }

  uploadFileBlog(event) {
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    this.ref = this.afStorage.ref('/blog/' + randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(event.target.files[0]);

    return '/blog/' + randomId;
  }

  uploadFileEvents(event) {
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    this.ref = this.afStorage.ref('/event/' + randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(event.target.files[0]);

    return '/event/' + randomId;
  }

  createTestimony(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('testimony')
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }

  readTestimony() {
    return this.firestore
      .collection('testimony')
      .valueChanges({ idField: 'id' });
  }

  deleteTestimony(data) {
    return data.forEach((element) => {
      this.firestore.collection('testimony').doc(element.id).delete();
    });
  }

  createEvent(event) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('event')
        .add(event)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }

  readEvents() {
    return this.firestore.collection('event').valueChanges({ idField: 'id' });
  }

  deleteEvent(data) {
    return data.forEach((element) => {
      this.firestore.collection('event').doc(element.id).delete();
    });
  }

  readAllBookings() {
    return this.firestore.collection('booking').valueChanges({ idField: 'id' });
  }

  readUserName(uid) {
    return this.firestore.collection('users').doc(uid).valueChanges();
  }
}
