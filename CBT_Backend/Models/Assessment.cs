using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CBT_Backend.Models
{
    public class Assessment
    {
        public string? Id { get; set; }
        public string? CourseId { get; set; }
        public string? Question { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
        public List<Options>? Options { get; set; }
    }
}