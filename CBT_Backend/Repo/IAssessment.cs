using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CBT_Backend.DTO;
using CBT_Backend.Models;

namespace CBT_Backend.Repo
{
    public interface IAssessment
    {
        public Task<IEnumerable<Assessment>> GetAssessments();
        public Task<Assessment> GetAssessment(string id);
        public Task<string> UpdateAssessment(string id, Assessment_DTO assessment);
        public Task<string> DeleteAssessment(string id);
        public Task<string> CreateAssessment(Assessment_DTO assessment);
    }
}