import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from 'src/app/_models/note';
import { EquipmentsService } from 'src/app/_services/equipments.service';
import { NoteService } from 'src/app/_services/note.service';

@Component({
  selector: 'app-equipment-notes',
  templateUrl: './equipment-notes.component.html',
  styleUrls: ['./equipment-notes.component.css']
})
export class EquipmentNotesComponent implements OnInit {
  @ViewChild('noteForm') noteForm: NgForm;
  @Input() notes: Note[];
  @Input() username: string;
  noteContent: string;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
  }

  sendNote() {
    this.noteService.sendNote(this.username, this.noteContent).subscribe(note => {
      this.notes.push(note);
      this.noteForm.reset();
    })
  }

}
