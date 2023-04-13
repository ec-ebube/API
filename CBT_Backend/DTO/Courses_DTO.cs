using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CBT_Backend.Models;

namespace CBT_Backend.DTO
{
    public class Courses_DTO
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        // public string? AssessmentId { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
        public List<Users>? Users { get; set; }
        public List<Assessment>? Assessments { get; set; }
    }
}