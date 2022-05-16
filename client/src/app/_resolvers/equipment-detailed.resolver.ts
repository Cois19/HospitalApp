import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Equipment } from '../_models/equipment';
import { EquipmentsService } from '../_services/equipments.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentDetailedResolver implements Resolve<Equipment> {

  constructor(private equipmentService: EquipmentsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Equipment> {
    return this.equipmentService.getEquipment(route.paramMap.get('username'));
  }
}
