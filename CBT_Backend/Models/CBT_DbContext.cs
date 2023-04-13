using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CBT_Backend.Models
{
    public class CBT_DbContext : DbContext
    {
        public CBT_DbContext(DbContextOptions<CBT_DbContext> options) : base(options)
        {

        }
        public DbSet<Assessment> Assessments {get; set;} = null!;
        public DbSet<Courses> Courses {get; set;} = null!;
        public DbSet<Options> Options {get; set;} = null!;
        public DbSet<Users> Users {get; set;} = null!;
    }
}