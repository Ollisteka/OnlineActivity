using Newtonsoft.Json;

namespace OnlineActivity.Models.User
{
    [JsonObject]
    public class UserToCreateDto
    {
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}
