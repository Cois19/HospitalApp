using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime DateOfProduction { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string Department { get; set; }
        public string Description { get; set; }
        public string HowToUse { get; set; }
        public string Category { get; set; }
        public string Hospital { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<UserMark> MarkedByUsers { get; set; }
        public ICollection<UserMark> MarkedUsers { get; set; }
    }
}