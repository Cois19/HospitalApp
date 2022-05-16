using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IMarksRepository
    {
        Task<UserMark> GetUserMark(int sourceUserId, int markedUserId);
        Task<AppUser> GetUserWithMarks(int userId);
        Task<PagedList<MarkDto>> GetUserMarks(MarksParams marksParams);
    }
}