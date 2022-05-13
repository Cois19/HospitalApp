import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/app/_models/equipment';
import { EquipmentsService } from 'src/app/_services/equipments.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
  equipments: Equipment[];

  constructor(private equipmentService: EquipmentsService) { }

  ngOnInit(): void {
    this.loadEquipments();
  }

  loadEquipments() {
    this.equipmentService.getEquipments().subscribe(equipments => {
      this.equipments = equipments;
    })
  }

}
