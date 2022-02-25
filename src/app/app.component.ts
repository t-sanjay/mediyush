import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  loader = true;

  constructor(private primengConfig: PrimeNGConfig, private router: Router) {}
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.router.navigate(['']);

    setTimeout(() => {
      this.hideLoader();
    }, 1500);
  }
  hideLoader() {
    this.loader = false;
  }
  title = 'Mediyush';
}
