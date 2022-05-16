using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Authorize]
    public class MarksController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMarksRepository _marksRepository;
        public MarksController(IUserRepository userRepository, IMarksRepository marksRepository)
        {
            _marksRepository = marksRepository;
            _userRepository = userRepository;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddMarks(string username)
        {
            var sourceUserId = User.GetUserId();
            var markedUser = await _userRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _marksRepository.GetUserWithMarks(sourceUserId);

            if (markedUser == null) return NotFound();

            if (sourceUser.UserName == username) return BadRequest("You cannot mark yourself");

            var userMark = await _marksRepository.GetUserMark(sourceUserId, markedUser.Id);

            if (userMark != null) return BadRequest("You already mark this user");

            userMark = new UserMark
            {
                SourceUserId = sourceUserId,
                MarkedUserId = markedUser.Id
            };

            sourceUser.MarkedUsers.Add(userMark);

            if (await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to mark user");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MarkDto>>> GetUserMarks([FromQuery]MarksParams marksParams)
        {
            marksParams.UserId = User.GetUserId();
            var users = await _marksRepository.GetUserMarks(marksParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(users);
        }
    }
}