using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    public class UserToCreateDto
    {
        [JsonPropertyName("login")]
        public string Login { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("identityId")]
        public string IdentityId { get; set; }
    }
}
