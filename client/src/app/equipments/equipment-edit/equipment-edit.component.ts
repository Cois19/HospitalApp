import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Equipment } from 'src/app/_models/equipment';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { EquipmentsService } from 'src/app/_services/equipments.service';

@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.css']
})
export class EquipmentEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  equipment: Equipment;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private equipmentService: EquipmentsService,
    private toastr: ToastrService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.equipmentService.getEquipment(this.user.username).subscribe(equipment => {
      this.equipment = equipment
    })
  }

  updateEquipment() {
    this.equipmentService.updateEquipment(this.equipment).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.editForm.reset(this.equipment);
    })
  }

}
