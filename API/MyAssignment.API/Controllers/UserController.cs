using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyAssignment.Persistence.Interfaces;
using MyAssignment.Persistence.Models;

namespace MyAssignment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;

        public UserController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User obj)
        {
            if (obj == null)
                return BadRequest();
            
            var user = await _repository.LoginAsync(obj);

            if (user == null)
                return NotFound(new { Message = "Login Failed!" });

            return Ok(new { Message = "Login Success!" });
        }

        [HttpPost("registration")]
        public async Task<IActionResult> Registration([FromBody] User obj)
        {
            if (obj == null)
                return BadRequest();

            await _repository.RegistrationAsync(obj);

            return Ok(new { Message = "Registered Success!" });
        }

    }
}
