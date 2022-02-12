import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private cartSource = new BehaviorSubject<any[]>([]);

  cartObserver$ = this.cartSource.asObservable();

  private totalPriceSource = new BehaviorSubject<number>(0);

  totalPriceObserver$ = this.totalPriceSource.asObservable();

  totalPrice = 0;

  coursesAll = [];

  eventsAll = [];
  bagData = [];
  user: any;
  constructor(
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {
    this.readAllCourses();
    this.readAllEvents();
    this.user = JSON.parse(localStorage.getItem('userMed'));
    if (
      JSON.parse(localStorage.getItem('cartDataMediyush')) !== null ||
      undefined
    ) {
      this.bagData = JSON.parse(localStorage.getItem('cartDataMediyush'));
      this.cartSource.next(Object.assign([], this.bagData));
    }
    if (this.user !== null) {
      this.firestore
        .collection('users')
        .doc(this.user.uid)
        .valueChanges()
        .subscribe((res) => this.readBagDataFromFireBase(res));
    }
  }

  readBagDataFromFireBase(data) {
    this.bagData = data.cart;
    this.cartSource.next(Object.assign([], this.bagData));
  }

  readAds() {
    return this.firestore.collection('ads').valueChanges({ idField: 'id' });
  }

  readCourses() {
    return this.firestore
      .collection('courses', (ref) => ref.where('showOnFirstPage', '==', true))
      .valueChanges({ idField: 'id' });
  }

  readAllCourses() {
    return this.firestore
      .collection('courses')
      .valueChanges({ idField: 'id' })
      .subscribe((res) => this.readCoursesData(res));
  }

  readCoursesData(data) {
    this.coursesAll = data;
    this.coursesAll.forEach((element) => {
      this.afStorage
        .ref(element.fileName)
        .getDownloadURL()
        .subscribe((res) => {
          element.fileName = res;
        });
    });
  }

  readAllEvents() {
    return this.firestore
      .collection('event')
      .valueChanges({ idField: 'id' })
      .subscribe((res) => this.readEventsData(res));
  }

  readEventsData(data) {
    this.eventsAll = data;
    this.eventsAll.forEach((element) => {
      this.afStorage
        .ref(element.fileName)
        .getDownloadURL()
        .subscribe((res) => {
          element.fileName = res;
        });
    });
  }

  addToBag(data) {
    if (this.bagData.indexOf(data) !== -1) {
      this.cartSource.next(Object.assign([], this.bagData));
    } else {
      this.totalPrice += data.price;
      this.totalPriceSource.next(this.totalPrice);
      this.coursesAll.find((e) => e.id == data.id).inBag = true;
      this.bagData.push(data);

      if (this.user !== null || undefined) {
        this.firestore
          .collection('users')
          .doc(this.user.uid)
          .update({ cart: this.bagData });
      } else {
        localStorage.setItem('cartDataMediyush', JSON.stringify(this.bagData));
      }

      this.cartSource.next(Object.assign([], this.bagData));
    }
  }

  addToBagEvents(data) {
    if (this.bagData.indexOf(data) !== -1) {
      this.cartSource.next(Object.assign([], this.bagData));
    } else {
      this.totalPrice += data.price;
      this.totalPriceSource.next(this.totalPrice);
      this.eventsAll.find((e) => e == data).inBag = true;
      this.bagData.push(data);
      if (this.user !== null || undefined) {
        this.firestore
          .collection('users')
          .doc(this.user.uid)
          .update({ cart: this.bagData });
      } else {
        localStorage.setItem('cartDataMediyush', JSON.stringify(this.bagData));
      }
      this.cartSource.next(Object.assign([], this.bagData));
    }
  }

  removeFromBagEvents(course) {
    this.eventsAll.find((e) => e == course).inBag = false;

    if (this.bagData.find((e) => e.id == course.id) !== {} || null) {
      this.totalPrice -= course.price;
      if (this.totalPrice < 0) {
        this.totalPrice = 0;
      }
      this.bagData.splice(
        this.bagData.findIndex((d) => d === course),
        1
      );
      if (this.user !== null || undefined) {
        this.firestore
          .collection('users')
          .doc(this.user.uid)
          .update({ cart: this.bagData });
      } else {
        localStorage.setItem('cartDataMediyush', JSON.stringify(this.bagData));
      }
      this.cartSource.next(Object.assign([], this.bagData));
      this.totalPriceSource.next(this.totalPrice);
    }
  }

  readFromBag() {
    return this.bagData;
  }

  removeFromBag(course) {
    this.coursesAll.find((e) => e.id == course.id).inBag = false;

    if (this.bagData.find((e) => e.id == course.id) !== {} || null) {
      this.totalPrice -= course.price;
      if (this.totalPrice < 0) {
        this.totalPrice = 0;
      }
      this.bagData.splice(
        this.bagData.findIndex((d) => d === course),
        1
      );
      this.cartSource.next(Object.assign([], this.bagData));
      this.totalPriceSource.next(this.totalPrice);
      if (this.user !== null || undefined) {
        this.firestore
          .collection('users')
          .doc(this.user.uid)
          .update({ cart: this.bagData });
      } else {
        localStorage.setItem('cartDataMediyush', JSON.stringify(this.bagData));
      }
    }
  }

  addBooking(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('booking')
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }

  getMyBookings(uid) {
    return this.firestore
      .collection('booking', (ref) => ref.where('userId', '==', uid))
      .valueChanges({ idField: 'id' });
  }

  readAllTestimony() {
    return this.firestore.collection('testimony').valueChanges();
  }

  readAllBlogs() {
    return this.firestore.collection('blogs').valueChanges();
  }

  readCoursesByCategory(category) {
    return this.firestore
      .collection('courses', (ref) => ref.where('category', '==', category))
      .valueChanges({ idField: 'id' });
  }

  updateUserName(name) {
    let user = JSON.parse(localStorage.getItem('userMed'));
    this.firestore
      .collection('users')
      .doc(user.uid)
      .update({ displayName: name.value.fname + ' ' + name.value.lname });
  }

  getUserDetails(uid) {
    return this.firestore
      .collection('users', (ref) => ref.where('uid', '==', uid))
      .valueChanges();
  }
}