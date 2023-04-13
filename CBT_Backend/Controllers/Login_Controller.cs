using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CBT_Backend.Repo;
using Microsoft.AspNetCore.Mvc;

namespace CBT_Backend.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class Login_Controller : ControllerBase
    {
        private readonly ILogin? _ilogin;
        public Login_Controller(ILogin? ilogin)
        {
            _ilogin = ilogin;
        }

        [HttpPost]
        public async Task<ActionResult> login([FromForm] string Email, [FromForm] string password)
        {
            try
            {
                var user = await _ilogin!.Login(Email, password);
                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}