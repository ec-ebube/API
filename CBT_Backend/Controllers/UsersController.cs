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
    public class UsersController : ControllerBase
    {
        private readonly IUsers? _iusers;
        public UsersController(IUsers iusers)
        {
            _iusers = iusers;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult> getUsers()
        {
            try
            {
                var users = await _iusers!.GetUsers();
                if (users.ToList().Count == 0)
                {
                    throw new Exception("NO User found");
                }
                return Ok(users);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/get")]
        public async Task<ActionResult> getsingleUser([FromRoute] string Id)
        {
            var user = await _iusers!.GetUser(Id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateUser([FromForm] Users_DTO users)
        {

            const string B = "User Created";
            const string C = "Somthing went wrong";
            try
            {
                if (ModelState.IsValid)
                {
                    var user = await _iusers!.CreateUser(users);
                    switch (user)
                    {
                        case (C):
                            return BadRequest(user);
                        case B:
                            return Ok(user);
                        default:
                            return BadRequest(user);
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
        public async Task<ActionResult> UpdateUser([FromForm] Users_DTO users, [FromRoute] string id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = await _iusers!.UpdateUser(id, users);
                    if (user == "Successful")
                    {
                        return Ok(user);
                    }
                    return BadRequest(user);
                }
                return BadRequest("Please fill all required feild");
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}/delete")]
        public async Task<ActionResult> DeleteUser([FromRoute] string id)
        {
            try
            {
                var user = await _iusers!.DeleteUser(id);
                if (user == "Deleted Successfully")
                {
                    return Ok("Deleted");
                }
                if (user == "User not found")
                {
                    return NotFound();
                }
                return BadRequest(user);
            }
            catch (System.Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }

}