using System.ComponentModel.DataAnnotations;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace IdentityServer.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    [AllowAnonymous]
    public class AuthenticateController : Controller
    {
        private readonly IIdentityServerInteractionService interaction;
        private readonly IWebHostEnvironment environment;
        private readonly SignInManager<AppUser> signInManager;
        private readonly UserManager<AppUser> userManager;

        public AuthenticateController(
            IIdentityServerInteractionService interaction,
            IWebHostEnvironment environment, 
            UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager)
        {
            this.interaction = interaction;
            this.environment = environment;
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        public class LoginRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public string ReturnUrl { get; set; }
        }
        
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var user = new AppUser { UserName = registerDto.Username, Email = registerDto.Email };

            var result = await userManager.CreateAsync(user, registerDto.Password);

            var context = await interaction.GetAuthorizationContextAsync(registerDto.ReturnUrl);

            if (result.Succeeded && context != null)
            {
                await HttpContext.SignInAsync(user.Id.ToString(), user.UserName);
                return new JsonResult(new { RedirectUrl = registerDto.ReturnUrl, IsOk = true });
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody]LoginDto loginDto)
        {
            var context = await interaction.GetAuthorizationContextAsync(loginDto.ReturnUrl);

            var user = await userManager.FindByNameAsync(loginDto.Username);

           

            if (user!= null  && context != null)
            {
                await HttpContext.SignInAsync(user.Id.ToString(), user.UserName);
                return new JsonResult(new { RedirectUrl = loginDto.ReturnUrl, IsOk = true });
            }

            return Unauthorized();
        }

        [HttpPost]
        public async Task<IActionResult> Login1([FromBody]LoginRequest request)
        {
            var context = await interaction.GetAuthorizationContextAsync(request.ReturnUrl);
            var user = Config.GetTestUsers()
                .FirstOrDefault(usr => usr.Password == request.Password && usr.Username == request.Username);

            if (user != null && context != null)
            {
                await HttpContext.SignInAsync(user.SubjectId, user.Username);
                return new JsonResult(new { RedirectUrl = request.ReturnUrl, IsOk = true });
            }

            return Unauthorized();
        }

        [HttpGet]
        [Route("logout")]
        public async Task<IActionResult> Logout(string logoutId)
        {
            var context = await interaction.GetLogoutContextAsync(logoutId);
            var showSignoutPrompt = context?.ShowSignoutPrompt != false;

            if (User?.Identity.IsAuthenticated == true)
            {
                await HttpContext.SignOutAsync();
                await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);
                await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);
            }

            // no external signout supported for now (see \Quickstart\Account\AccountController.cs TriggerExternalSignout)
            return Ok(new
            {
                showSignoutPrompt,
                ClientName = string.IsNullOrEmpty(context?.ClientName) ? context?.ClientId : context?.ClientName,
                context?.PostLogoutRedirectUri,
                context?.SignOutIFrameUrl,
                logoutId
            });
        }

        [HttpGet]
        [Route("Error")]
        public async Task<IActionResult> Error(string errorId)
        {
            // retrieve error details from identityserver
            var message = await interaction.GetErrorContextAsync(errorId);

            if (message != null)
            {
                if (!environment.IsDevelopment())
                {
                    // only show in development
                    message.ErrorDescription = null;
                }
            }

            return Ok(message);
        }
    }
}
