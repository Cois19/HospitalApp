import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Note } from '../_models/note';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getNotes(pageNumber, pageSize, container) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Note[]>(this.baseUrl + 'notes', params, this.http);
  }

  getNoteThread(username: string) {
    return this.http.get<Note[]>(this.baseUrl + 'notes/thread/' + username);
  }

  sendNote(username: string, content: string) {
    return this.http.post<Note>(this.baseUrl + 'notes', {recipientUsername: username, content});
  }

  deleteNote(id: number) {
    return this.http.delete(this.baseUrl + 'notes/' + id);
  }
}
