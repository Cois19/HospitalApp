using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MarksRepository : IMarksRepository
    {
        private readonly DataContext _context;
        public MarksRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserMark> GetUserMark(int sourceUserId, int markedUserId)
        {
            return await _context.Marks.FindAsync(sourceUserId, markedUserId);
        }

        public async Task<PagedList<MarkDto>> GetUserMarks(MarksParams marksParams)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var marks = _context.Marks.AsQueryable();

            if (marksParams.Predicate == "marked")
            {
                marks = marks.Where(mark => mark.SourceUserId == marksParams.UserId);
                users = marks.Select(mark => mark.MarkedUser);
            }

            if (marksParams.Predicate == "markedBy")
            {
                marks = marks.Where(mark => mark.MarkedUserId == marksParams.UserId);
                users = marks.Select(mark => mark.SourceUser);
            }

            var markedUsers = users.Select(user => new MarkDto
            {
                Username = user.UserName,
                KnownAs = user.KnownAs,
                Age = user.DateOfProduction.CalculateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                Category = user.Category,
                Id = user.Id
            });

            return await PagedList<MarkDto>.CreateAsync(markedUsers, marksParams.PageNumber, marksParams.PageSize);
        }

        public async Task<AppUser> GetUserWithMarks(int userId)
        {
            return await _context.Users
                .Include(x => x.MarkedUsers)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}