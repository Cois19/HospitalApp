import { Component, Input, OnInit } from '@angular/core';
import { Equipment } from 'src/app/_models/equipment';

@Component({
  selector: 'app-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.css']
})
export class EquipmentCardComponent implements OnInit {
  @Input() equipment: Equipment;

  constructor() { }

  ngOnInit(): void {
  }

}
