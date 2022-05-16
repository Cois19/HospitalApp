using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<UserMark> Marks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserMark>()
                .HasKey(k => new {k.SourceUserId, k.MarkedUserId});

            builder.Entity<UserMark>()
                .HasOne(s => s.SourceUser)
                .WithMany(l => l.MarkedUsers)
                .HasForeignKey(s => s.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserMark>()
                .HasOne(s => s.MarkedUser)
                .WithMany(l => l.MarkedByUsers)
                .HasForeignKey(s => s.MarkedUserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}