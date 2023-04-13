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
    [Route("api/[Controller]")]
    public class AssessmentController : ControllerBase
    {
        private readonly IAssessment? _iassessment;
        public AssessmentController(IAssessment iassessments)
        {
            _iassessment = iassessments;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult> getAssessments()
        {
            try
            {
                var assess = await _iassessment!.GetAssessments();
                if (assess.ToList().Count == 0)
                {
                    throw new Exception("Not Found");
                }
                return Ok(assess);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("{id}/get")]
        public async Task<ActionResult> getsingleAssessment([FromRoute] string Id)
        {
            var assess = await _iassessment!.GetAssessment(Id);
            return Ok(assess);
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateAssessment([FromForm] Assessment_DTO assessment)
        {
            const string B = "Assessments Created";
            const string C = "Somthing went wrong";
            try
            {
                if (ModelState.IsValid)
                {
                    var assess = await _iassessment!.CreateAssessment(assessment);
                    switch (assess)
                    {
                        case C:
                            return BadRequest(assess);
                        case B:
                            return Ok(assess);
                        default:
                            return BadRequest(assess);
                    }
                }
                return BadRequest("Please fill all required spaces");
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("{id}/update")]
        public async Task<ActionResult> UpdateAssessment([FromForm] Assessment_DTO assessment, [FromRoute] string id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var assess = await _iassessment!.UpdateAssessment(id, assessment);
                    if (assess == "Successful")
                    {
                        return Ok(assess);
                    }
                    return BadRequest(assess);
                }
                return BadRequest("Please fill all required feild");
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}/delete")]
        public async Task<ActionResult> DeleteAssessment([FromRoute] string id)
        {
            try
            {
                var assess = await _iassessment!.DeleteAssessment(id);
                return Ok("Deleted");
            }
            catch (System.Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}