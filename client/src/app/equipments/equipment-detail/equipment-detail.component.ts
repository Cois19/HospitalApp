import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Equipment } from 'src/app/_models/equipment';
import { EquipmentsService } from 'src/app/_services/equipments.service';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {
  equipment: Equipment;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];


  constructor(private equipmentService: EquipmentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadEquipment();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        // preview: false
      }
    ]
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.equipment.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }

    return imageUrls;
  }

  loadEquipment() {
    this.equipmentService.getEquipment(this.route.snapshot.paramMap.get('username')).subscribe(equipment => {
      this.equipment = equipment;
      this.galleryImages = this.getImages();
    })
  }

}
