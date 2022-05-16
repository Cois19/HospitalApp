using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface INoteRepository
    {
        void AddNote(Note note);
        void DeleteNote(Note note);
        Task<Note> GetNote(int id);
        Task<PagedList<NoteDto>> GetNotesForUser(NoteParams noteParams);
        Task<IEnumerable<NoteDto>> GetNoteThread(string currentUsername, string recipientUsername);
        Task<bool> SaveAllAsync();
    }
}