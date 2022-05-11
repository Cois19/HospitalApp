using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Department { get; set; }
        public string Description { get; set; }
        public string HowToUse { get; set; }
        public string Category { get; set; }
        public string Hospital { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}