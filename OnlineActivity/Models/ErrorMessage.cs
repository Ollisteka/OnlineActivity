using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    public sealed class ErrorMessage
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "errorId")]
        public string Message { get; set; }
    }
}
