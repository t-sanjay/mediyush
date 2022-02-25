import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testcomp',
  templateUrl: './testcomp.component.html',
  styleUrls: ['./testcomp.component.css'],
})
export class TestcompComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('dashboard');
    }, 8000);
  }
}
