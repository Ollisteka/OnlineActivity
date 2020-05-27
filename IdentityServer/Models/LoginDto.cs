using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace IdentityServer.Models
{
    [JsonObject]
    public sealed class LoginDto
    {
        //[Required]
        public string Username { get; set; }

        //[Required]
        //[DataType(DataType.Password)]
        public string Password { get; set; }

        //[Required]
        public string ReturnUrl { get; set; }

        public bool RememberMe { get; set; } = false;
    }
}
