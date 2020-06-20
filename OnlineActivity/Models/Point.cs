using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    public sealed class Point
    {
        [JsonProperty(PropertyName = "x")]
        public double X { get; set; }

        [JsonProperty(PropertyName = "y")]
        public double Y { get; set; }
    }
}
