using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CBT_Backend.DTO;
using CBT_Backend.Repo;
using Microsoft.AspNetCore.Mvc;

namespace CBT_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoursesController : ControllerBase
    {
        private readonly ICourses? _icourses;
        public CoursesController(ICourses icourses)
        {
            _icourses = icourses;
        }

        [HttpGet("getAll")]
        public ActionResult getCorses()
        {
            try
            {
                var course = _icourses!.GetCourses();
                if (course.Result.ToList().Count == 0)
                {
                    throw new Exception("NO Course found");
                }
                return Ok(course.Result);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{Id}/get")]
        public async Task<ActionResult> getsingleCourse([FromRoute] string Id)
        {
            var course = await _icourses!.GetCourse(Id);
            return Ok(course);
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateCourse([FromForm] Courses_DTO courses)
        {

            const string B = "Course Created";
            const string C = "Not Created";
            try
            {
                if (ModelState.IsValid)
                {
                    var course = await _icourses!.CreateCourse(courses);
                    switch (course)
                    {
                        case (C):
                            return BadRequest(course);
                        case B:
                            return Ok(course);
                        default:
                            return BadRequest(course);
                    }

                }
                return BadRequest("Please fill all required feild");
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/update")]
        public async Task<ActionResult> UpdateCourse([FromBody] Courses_DTO courses, [FromRoute] string Id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var course = await _icourses!.UpdateCourse(Id, courses);
                    return Ok(course);
                }
                return BadRequest("Please fill all required feild");
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}/delete")]
        public async Task<ActionResult> DeleteCourses([FromRoute] string id)
        {
            try
            {
                var course = await _icourses!.DeleteCourse(id);
                return Ok("Deleted");
            }
            catch (System.Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}