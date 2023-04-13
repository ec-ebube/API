using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CBT_Backend.Models
{
    public class Options
    {
        public string? Id { get; set; }
        public string? Option_A { get; set; }
        public string? Option_B { get; set; }
        public string? Option_C { get; set; }
        public string? Option_D { get; set; }
        public string? Answer { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
        public string? Assessment_Id { get; set; }
    }
}