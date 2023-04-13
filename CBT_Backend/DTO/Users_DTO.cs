using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CBT_Backend.Models;

namespace CBT_Backend.DTO
{
    public class Users_DTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; } = "User";
        // public DateTime Created_at { get; set; }
        // public DateTime Updated_at { get; set; }
        // public List<Courses>? Course { get; set; }
    }
}