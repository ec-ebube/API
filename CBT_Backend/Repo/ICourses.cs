using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CBT_Backend.DTO;
using CBT_Backend.Models;

namespace CBT_Backend.Repo
{
    public interface ICourses
    {
        public Task<IEnumerable<Courses>> GetCourses();
        public Task<Courses> GetCourse(string id);
        public Task<Courses> UpdateCourse(string id, Courses_DTO course);
        public Task<string> DeleteCourse(string id);
        public Task<string> CreateCourse(Courses_DTO courses);
    }
}