import { Component, OnInit } from '@angular/core';
import { Equipment } from '../_models/equipment';
import { Pagination } from '../_models/pagination';
import { EquipmentsService } from '../_services/equipments.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  equipments: Partial<Equipment[]>;
  predicate = 'marked';
  pageNumber = 1;
  pageSize = 12;
  pagination: Pagination;

  constructor(private equipmentService: EquipmentsService) { }

  ngOnInit(): void {
    this.loadMarks();
  }

  loadMarks() {
    this.equipmentService.getMarks(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.equipments = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMarks();
  }

}
