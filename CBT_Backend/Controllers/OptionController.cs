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
    public class OptionController : ControllerBase
    {
        private readonly IOptions? _ioptions;
        public OptionController(IOptions ioptions)
        {
            _ioptions = ioptions;
        }

        [HttpGet("getAll")]
        public ActionResult getOptions()
        {
            try
            {
                var opt = _ioptions!.GetOptions();
                if (opt.Result.ToList().Count == 0)
                {
                    throw new Exception("No Options");
                }
                return Ok(opt.Result);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/get")]
        public async Task<ActionResult> getsingleOption([FromRoute] string Id)
        {
            var opt = await _ioptions!.GetOption(Id);
            return Ok(opt);
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateOption([FromForm] Options_DTO options)
        {

            const string B = "Options Created";
            const string C = "Not Created";
            try
            {
                if (ModelState.IsValid)
                {
                    var opt = await _ioptions!.CreateOption(options);
                    switch (opt)
                    {
                        case (C):
                            return BadRequest(opt);
                        case B:
                            return Ok(opt);
                        default:
                            return BadRequest(opt);
                    }
                }
                return BadRequest("Please fill all required feild");
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("{id}/update")]
        public async Task<ActionResult> UpdateOption([FromForm] Options_DTO option, [FromRoute] string id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var opt = await _ioptions!.UpdateOption(id, option);
                    if (opt == "Successful")
                    {
                        return Ok(opt);
                    }
                    return BadRequest(opt);
                }
                return BadRequest("Please fill all required feild");
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}/delete")]
        public ActionResult DeleteOption([FromRoute] string id)
        {
            try
            {
                var user = _ioptions!.DeleteOption(id);
                return Ok("Deleted");
            }
            catch (System.Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}