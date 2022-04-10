import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-testcomp',
  templateUrl: './testcomp.component.html',
  styleUrls: ['./testcomp.component.css'],
})
export class TestcompComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userMed'));
    // if (user) {
    //   this.authService.getUserData(user).subscribe((res) => {
    //     if (res.admin) {
    //       setTimeout(() => {
    //         this.router.navigateByUrl('dashboard-admin');
    //       }, 1000);
    //     } else {
    //       setTimeout(() => {
    //         this.router.navigateByUrl('dashboard');
    //       }, 1000);
    //     }
    //   });
    // } else {
    //   setTimeout(() => {
    //     this.router.navigateByUrl('dashboard');
    //   }, 1000);
    // }
  }
}
