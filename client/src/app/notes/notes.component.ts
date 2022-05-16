import { Component, OnInit } from '@angular/core';
import { Note } from '../_models/note';
import { Pagination } from '../_models/pagination';
import { NoteService } from '../_services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  pagination: Pagination;
  container = "Unread";
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() {
    this.loading = true;
    this.noteService.getNotes(this.pageNumber, this.pageSize, this.container).subscribe(response => {
      this.notes = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    })
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id).subscribe(() => {
      this.notes.splice(this.notes.findIndex(m => m.id == id), 1);
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadNotes();
    }
    
  }

}
