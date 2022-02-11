import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { WindowRefService } from 'src/app/window-ref.service';
import { AuthService } from 'src/app/_services/auth.service';
import { FirebaseService } from '../_serivces/firebase.service';
import { PaymentService } from '../_serivces/payment.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [WindowRefService],
})
export class MenuComponent implements OnInit {
  @Input() activeState: string;
  @Output() cartClicked = new EventEmitter<boolean>();
  @Output() cartClosed = new EventEmitter<any[]>();

  display: boolean;
  showMenuFlag = false;
  cartData = [];
  totalPrice = 0;
  sticky: boolean = false;
  loggedIn: boolean;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private winRef: WindowRefService,
    private payment: PaymentService,
    private messageService: MessageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('userMed') ? true : false;
    this.firebaseService.cartObserver$.subscribe((res) => {
      this.cart(res);
    });

    this.firebaseService.totalPriceObserver$.subscribe((res) => {
      this.totalPrice = res;
    });
  }

  showMenu() {
    this.showMenuFlag = !this.showMenuFlag;
  }

  cart(data) {
    this.cartData = data;
  }

  removeCourse(course) {
    this.firebaseService.removeFromBag(course);
  }

  signOut() {
    this.authService.signOut();
  }

  close() {
    this.cartClosed.emit(this.firebaseService.readFromBag());
  }

  createRzpayOrder() {
    let data = {
      amount: this.totalPrice.toString() + '00',
    };
    this.payment.createOrder(data).subscribe((res) => this.payWithRazor(res));
  }

  payWithRazor(val) {
    const options: any = {
      key: 'rzp_test_yQMV8OOrOsIpK2',
      amount: 125500, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: '', // company name or product name
      description: '', // product description
      image: '../../../assets/icons/MediyushPNG.png', // company logo or product image
      order_id: val.id, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a',
      },
    };
    options.handler = (response, error) => {
      options.response = response;
      this.paymentSuccess(response);
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
    };
    options.modal.ondismiss = () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Transction Failed, please try again.',
      });
      // handle the case when user closes the form while transaction is in progress
    };
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

  paymentSuccess(response) {
    let data = {
      courses: this.cartData,
      paymentDetails: response,
      userId: JSON.parse(localStorage.getItem('userMed')).uid,
    };
    this.firebaseService.addBooking(data);
    this.display = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Transction was Successfull',
      detail:
        'Please make note of your Order Id : ' +
        response.razorpay_order_id +
        ' and Payment Id ' +
        response.razorpay_payment_id,
    });
  }
}
