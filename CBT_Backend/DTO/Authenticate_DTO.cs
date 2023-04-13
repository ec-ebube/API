using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CBT_Backend.DTO
{
    public class Authenticate_DTO
    {
        public string? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Role { get; set; }
        public string? Token { get; set; } 
    }
}