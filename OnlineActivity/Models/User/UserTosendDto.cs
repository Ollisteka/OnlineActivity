using System;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace OnlineActivity.Models.User
{
    [JsonObject]
    public class UserToSendDto
    {
        [JsonPropertyName("login")]
        public string Login { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("id")]
        public Guid Id { get; set; }
    }
}
