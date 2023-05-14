using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CBT_Backend.DTO;
using CBT_Backend.Models;
using CBT_Backend.Repo;
using Microsoft.EntityFrameworkCore;

namespace CBT_Backend.Services
{
    public class AssessmentServices : IAssessment
    {
        private readonly CBT_DbContext? _cbtContext;
        public AssessmentServices(CBT_DbContext? cbtContext)
        {
            _cbtContext = cbtContext;
        }
        public async Task<string> CreateAssessment(Assessment_DTO assessment)
        {
            try
            {
                var newAssessment = new Assessment();
                var id = Guid.NewGuid();
                newAssessment.Id = id.ToString();
                newAssessment.CourseId = (assessment.CourseId);
                newAssessment.Question = assessment.Question;
                newAssessment.Option_A = assessment.Option_A;
                newAssessment.Option_B = assessment.Option_B;
                newAssessment.Option_C = assessment.Option_C;
                newAssessment.Option_D = assessment.Option_D;
                newAssessment.Answer = assessment.Answer;
                newAssessment.Created_at = DateTime.Now;
                newAssessment.Updated_at = DateTime.Now;

                var assess = await _cbtContext!.Assessments.AddAsync(newAssessment);
                if (assess == null)
                {
                    return "Somthing went wrong";
                }
                await _cbtContext!.Assessments.AddAsync(newAssessment);
                _cbtContext.SaveChanges();
                return "Assessments Created";
            }
            catch (System.Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> DeleteAssessment(string id)
        {
            try
            {
                var assessment = await _cbtContext!.Assessments.FindAsync(id);
                if (assessment == null)
                {
                    throw new Exception("Not Found");
                }
                _cbtContext.Remove(assessment);
                await _cbtContext.SaveChangesAsync();
                return "Deleted Successfully";
            }
            catch (System.Exception ex)
            {
                return ex.Message;
            }
        }

        public Task<Assessment> GetAssessment(string id)
        {
            try
            {
                var assess = _cbtContext!.Assessments.Where(a => a.Id == id).FirstAsync();
                if (assess == null)
                {
                    return null!;
                }
                return assess;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                var err = new { ex.Message };
                return null!;
            }
        }

        public async Task<IEnumerable<Assessment>> GetAssessments()
        {
            try
            {
                var assess = await _cbtContext!.Assessments.OrderBy(x => x.Created_at).ToListAsync();
                if (assess.Count == 0)
                {
                    return null!;
                }
                return assess;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                var errList = new List<Assessment>();
                return errList;
            }
        }

        public async Task<string> UpdateAssessment(string id, Assessment_DTO assessment)
        {
            try
            {
                var editAssess = await _cbtContext!.Assessments.FindAsync(id);
                if (editAssess == null)
                {
                    return null!;
                }
                editAssess.CourseId = assessment.CourseId;
                editAssess.Question = assessment.Question;
                editAssess.Option_A = assessment.Option_A;
                editAssess.Option_B = assessment.Option_B;
                editAssess.Option_C = assessment.Option_C;
                editAssess.Option_D = assessment.Option_D;
                editAssess.Answer = assessment.Answer;
                editAssess.Updated_at = DateTime.Now;
                _cbtContext.Assessments.Attach(editAssess);
                _cbtContext.SaveChanges();
                return "Successful";
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                return ex.Message;
            }
        }
    }
}