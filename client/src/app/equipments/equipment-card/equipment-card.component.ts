import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Equipment } from 'src/app/_models/equipment';
import { EquipmentsService } from 'src/app/_services/equipments.service';

@Component({
  selector: 'app-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.css']
})
export class EquipmentCardComponent implements OnInit {
  @Input() equipment: Equipment;

  constructor(private equipmentService: EquipmentsService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addLike(equipment: Equipment) {
    this.equipmentService.addMark(equipment.username).subscribe(() => {
      this.toastr.success('You have marked ' + equipment.knownAs);
    })
  }

}
