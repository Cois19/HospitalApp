using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Migrations
{
    public class NoteRepository : INoteRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public NoteRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddNote(Note note)
        {
            _context.Notes.Add(note);
        }

        public void DeleteNote(Note note)
        {
            _context.Notes.Remove(note);
        }

        public async Task<Note> GetNote(int id)
        {
            return await _context.Notes
            .Include(u => u.Sender)
            .Include(u => u.Recipient)
            .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<PagedList<NoteDto>> GetNotesForUser(NoteParams noteParams)
        {
            var query = _context.Notes
                .OrderByDescending(m => m.NoteSent)
                .AsQueryable();

            query = noteParams.Container switch
            {
                "Inbox" => query.Where(u => u.Recipient.UserName == noteParams.Username 
                    && u.RecipientDeleted == false),
                "Outbox" => query.Where(u => u.Sender.UserName == noteParams.Username
                    && u.SenderDeleted == false),
                _ => query.Where(u => u.Recipient.UserName == noteParams.Username && u.RecipientDeleted == false 
                    && u.DateRead == null)
            };

            var notes = query.ProjectTo<NoteDto>(_mapper.ConfigurationProvider);

            return await PagedList<NoteDto>.CreateAsync(notes, noteParams.PageNumber, noteParams.PageSize);
        }

        public async Task<IEnumerable<NoteDto>> GetNoteThread(string currentUsername, string recipientUsername)
        {
            var notes = await _context.Notes
                .Include(u => u.Sender).ThenInclude(p => p.Photos)
                .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                .Where(m => m.Recipient.UserName == currentUsername && m.RecipientDeleted == false
                        && m.Sender.UserName == recipientUsername
                        || m.Recipient.UserName == recipientUsername
                        && m.Sender.UserName == currentUsername && m.SenderDeleted == false
                )
                .OrderBy(m => m.NoteSent)
                .ToListAsync();

            var unreadNotes = notes.Where(m => m.DateRead == null 
                && m.Recipient.UserName == currentUsername).ToList();

            if (unreadNotes.Any())
            {
                foreach (var note in unreadNotes)
                {
                    note.DateRead = DateTime.Now;
                }

                await _context.SaveChangesAsync();
            }

            return _mapper.Map<IEnumerable<NoteDto>>(notes);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}