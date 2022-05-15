import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Equipment } from 'src/app/_models/equipment';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { EquipmentsService } from 'src/app/_services/equipments.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
  equipments: Equipment[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  departmentList = [{value: 'clinical', display: 'Clinical'}, {value: 'nursing', display: 'Nursing'},
    {value: 'supportive', display: 'Supportive'}, {value: 'technical', display: 'Technical'},
      {value: 'administrative', display: 'Administrative'}]

  constructor(private equipmentService: EquipmentsService) {
    this.userParams = this.equipmentService.getUserParams();
  }

  ngOnInit(): void {
    this.loadEquipments();
  }

  loadEquipments() {
    this.equipmentService.setUserParams(this.userParams);
    this.equipmentService.getEquipments(this.userParams).subscribe(response => {
      this.equipments = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters() {
    this.userParams = this.equipmentService.resetUserParams();
    this.loadEquipments();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.equipmentService.setUserParams(this.userParams);
    this.loadEquipments();
  }
}
