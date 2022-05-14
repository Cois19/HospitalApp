import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Equipment } from '../_models/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {
  baseUrl = environment.apiUrl;
  equipments: Equipment[] = [];

  constructor(private http: HttpClient) { }

  getEquipments() {
    if (this.equipments.length > 0) return of(this.equipments);
    return this.http.get<Equipment[]>(this.baseUrl + 'users').pipe(
      map(equipments => {
        this.equipments = equipments;
        return equipments;
      })
    )
  }

  getEquipment(username: string) {
    const equipment = this.equipments.find(x => x.username === username);
    if (equipment !== undefined) return of(equipment);
    return this.http.get<Equipment>(this.baseUrl + 'users/' + username);
  }

  updateEquipment(equipment: Equipment) {
    return this.http.put(this.baseUrl + 'users/', equipment).pipe(
      map(() => {
        const index = this.equipments.indexOf(equipment);
        this.equipments[index] = equipment;
      })
    )
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
