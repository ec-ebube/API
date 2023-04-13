using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CBT_Backend.Models
{
    public class Courses
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        // public string? AssessmentId { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
        public List<Users>? Users { get; set; }
        public List<Assessment>? Assessments { get; set; }
    }
}