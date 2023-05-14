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
    public class CoursesServices : ICourses
    {
        private readonly CBT_DbContext? _cbtContext;
        public CoursesServices(CBT_DbContext? cbtContext)
        {
            _cbtContext = cbtContext;
        }

        public async Task<string> CreateCourse(Courses_DTO courses)
        {
            try
            {
                var newCourse = new Courses();
                var id = Guid.NewGuid();
                newCourse.Id = id.ToString();
                newCourse.Name = courses.Name;
                newCourse.Description = courses.Description;
                // newCourse.AssessmentId = courses.AssessmentId;
                newCourse.Created_at = DateTime.Now;
                newCourse.Updated_at = DateTime.Now;
                var course = await _cbtContext!.Courses.AddAsync(newCourse);
                if (course == null)
                {
                    return "Not Created";
                }
                await _cbtContext!.Courses.AddAsync(newCourse);
                _cbtContext.SaveChanges();
                return "Course Created";
            }
            catch (System.Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> DeleteCourse(string id)
        {
            try
            {
                var course = await _cbtContext!.Courses.FindAsync(id);
                if (course == null)
                {
                    throw new Exception("Course not found");
                }
                _cbtContext.Remove(course);
                await _cbtContext.SaveChangesAsync();
                return "Deleted Succssfully";
            }
            catch (System.Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<Courses> GetCourse(string id)
        {
            try
            {
                var course = _cbtContext!.Courses.Where(a => a.Id == id)
                .Include(asses => asses.Assessments);
                if (course == null)
                {
                    return null!;
                }
                var allCourses = await course!.FirstOrDefaultAsync();
                return allCourses!;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                var err = new { ex.Message };
                return null!;
            }
        }

        public async Task<IEnumerable<Courses>> GetCourses()
        {
            try
            {
                var courses = await _cbtContext!.Courses.OrderBy(x => x.Name).Include(a => a.Assessments).ToListAsync();
                if (courses.Count == 0)
                {
                    return null!;
                }
                return courses;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                var errList = new List<Courses>();
                return errList;
            }
        }

        public async Task<Courses> UpdateCourse(string id, Courses_DTO course)
        {
            try
            {
                var editCoures = await _cbtContext!.Courses.FindAsync();
                if (editCoures == null)
                {
                    return null!;
                }
                editCoures.Name = course.Name;
                editCoures.Description = course.Description;
                // editCoures.AssessmentId = course.AssessmentId;
                editCoures.Updated_at = DateTime.Now;
                _cbtContext.Courses.Attach(editCoures);
                _cbtContext.SaveChanges();
                return editCoures;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null!;
            }
        }
    }
}