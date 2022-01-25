import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @Input() activeState: string;
  showMenuFlag = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  showMenu() {
    this.showMenuFlag = !this.showMenuFlag;
  }

  signOut() {
    this.authService.signOut();
  }
}
