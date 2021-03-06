import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.readUsers().subscribe((res) => this.getAllUsers(res));
  }

  getAllUsers(users: any) {
    this.users = users;
  }
}
