using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer.Models;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;

namespace IdentityServer
{
    public class CustomProfileService: IProfileService
    {
        private readonly UserManager<AppUser> userManager;

        public CustomProfileService(UserManager<AppUser> userManager)
        {
            this.userManager = userManager;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var user = await userManager.FindByIdAsync(context.Subject.GetSubjectId());

            context.IssuedClaims = GetClaimsFromUser(user);
        }

        public async  Task IsActiveAsync(IsActiveContext context)
        {
            var user = await userManager.FindByIdAsync(context.Subject.GetSubjectId());
            context.IsActive = user != null;
        }

        private List<Claim> GetClaimsFromUser(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtClaimTypes.Subject, user.Id.ToString()),
                new Claim(JwtClaimTypes.Name, user.UserName),
                new Claim(JwtClaimTypes.PreferredUserName, user.UserName)
            };

            if (userManager.SupportsUserEmail)
            {
                claims.AddRange(new[]
                {
                    new Claim(JwtClaimTypes.Email, user.Email),
                    new Claim(JwtClaimTypes.EmailVerified, user.EmailConfirmed ? "true" : "false", ClaimValueTypes.Boolean)
                });
            }

            return claims;
        }
    }
}
