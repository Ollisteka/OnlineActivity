using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    public sealed class Line
    {
        [JsonProperty(PropertyName = "start")]
        public Point Start { get; set; }

        [JsonProperty(PropertyName = "end")]
        public Point End { get; set; }
    }
}
