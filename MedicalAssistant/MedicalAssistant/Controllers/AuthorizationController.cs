using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using MedicalAssistant.BLL.Interfaces;
using MedicalAssistant.DAL.Entities;
using MedicalAssistant.Helpers;
using MedicalAssistant.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace MedicalAssistant.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IJWTTokenService _tokenService;
        private readonly EFDbContext _context;
        private readonly UserManager<DbUser> _userManager;
        private readonly SignInManager<DbUser> _signInManager;

        public AuthorizationController(EFDbContext context,UserManager<DbUser> userManager,SignInManager<DbUser> signInManager, IConfiguration configuration, IJWTTokenService tokenService)
        {
            _tokenService = tokenService;
            _configuration = configuration;
            _userManager = userManager;
            _context = context;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            //if (!ModelState.IsValid)
            //{
            //    var errrors = CustomValidator.GetErrorsByModel(ModelState);
            //    return BadRequest(errrors);
            //}

            if(_userManager.FindByEmailAsync(model.Email).Result==null)
                return BadRequest(new { invalid = "Email does not exist" });

            var result = await _signInManager
                .PasswordSignInAsync(model.Email, model.Password,
                false, false);

            if (!result.Succeeded)
            {
                return BadRequest(new { invalid = "No correct password" });
            }


            var user = await _userManager.FindByEmailAsync(model.Email);
            await _signInManager.SignInAsync(user, isPersistent: false);

            var response = new
            {
                refToken = _tokenService.CreateRefreshToken(user),
                token = _tokenService.CreateToken(user)
            };
            return Ok(response);
           
        }


        [HttpPost("refresh/{refreshToken}")]
        public IActionResult RefreshToken([FromRoute]string refreshToken)
        {
            //return NotFound("Refresh token not found");
            var _refreshToken = _context.RefreshTokens
                .Include(u => u.User)
                .SingleOrDefault(m => m.Token == refreshToken);

            if (_refreshToken == null)
            {
                return NotFound("Refresh token not found");
            }

            _refreshToken.Token = Guid.NewGuid().ToString();
            _context.RefreshTokens.Update(_refreshToken);
            _context.SaveChanges();

            return Ok(
            new
            {
                token = _tokenService.CreateToken(_refreshToken.User),
                refToken = _refreshToken.Token
            });
        }

    }
}
