using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace CBT_Backend.Models
{
    public class Users : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Role { get; set; } = "User";
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
        public List<Courses>? Course { get; set; }
    }
}