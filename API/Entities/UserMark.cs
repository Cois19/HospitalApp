using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class UserMark
    {
        public AppUser SourceUser { get; set; }
        public int SourceUserId { get; set; }
        public AppUser MarkedUser { get; set; }
        public int MarkedUserId { get; set; }
    }
}