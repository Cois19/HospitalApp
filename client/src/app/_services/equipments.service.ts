import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Equipment } from '../_models/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEquipments() {
    return this.http.get<Equipment[]>(this.baseUrl + 'users');
  }

  getEquipment(username: string) {
    return this.http.get<Equipment>(this.baseUrl + 'users/' + username);
  }
}
