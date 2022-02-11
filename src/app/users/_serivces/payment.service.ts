import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  mapi = environment.mapi;
  constructor(private httpClient: HttpClient) {}

  createOrder(data) {
    return this.httpClient.post<any>(this.mapi + 'createOrder/', data);
  }
}
