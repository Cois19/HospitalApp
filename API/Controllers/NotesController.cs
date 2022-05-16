using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class NotesController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly INoteRepository _noteRepository;
        private readonly IMapper _mapper;
        public NotesController(IUserRepository userRepository, INoteRepository noteRepository, IMapper mapper)
        {
            _mapper = mapper;
            _noteRepository = noteRepository;
            _userRepository = userRepository;
        }

        [HttpPost]
        public async Task<ActionResult<NoteDto>> CreateNote(CreateNoteDto createNoteDto)
        {
            var username = User.GetUsername();

            if (username == createNoteDto.RecipientUsername.ToLower())
                return BadRequest("You cannot send notes to yourself");
            
            var sender = await _userRepository.GetUserByUsernameAsync(username);
            var recipient = await _userRepository.GetUserByUsernameAsync(createNoteDto.RecipientUsername);

            if (recipient == null) return NotFound();

            var note = new Note
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createNoteDto.Content
            };

            _noteRepository.AddNote(note);

            if (await _noteRepository.SaveAllAsync()) return Ok(_mapper.Map<NoteDto>(note));

            return BadRequest("Failed to send note");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NoteDto>>> GetNotesForUser([FromQuery]NoteParams noteParams)
        {
            noteParams.Username = User.GetUsername();

            var notes = await _noteRepository.GetNotesForUser(noteParams);

            Response.AddPaginationHeader(notes.CurrentPage, notes.PageSize, notes.TotalCount, notes.TotalPages);

            return notes;
        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<NoteDto>>> GetNoteThread(string username)
        {
            var currentUsername = User.GetUsername();

            return Ok(await _noteRepository.GetNoteThread(currentUsername, username));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteNote(int id)
        {
            var username = User.GetUsername();

            var note = await _noteRepository.GetNote(id);

            if (note.Sender.UserName != username && note.Recipient.UserName != username)
                return Unauthorized();

            if (note.Sender.UserName == username) note.SenderDeleted = true;

            if (note.Recipient.UserName == username) note.RecipientDeleted = true;

            if (note.SenderDeleted && note.RecipientDeleted)
                _noteRepository.DeleteNote(note);

            if (await _noteRepository.SaveAllAsync()) return Ok();

            return BadRequest("Problem deleting the note");
        }
    }
}