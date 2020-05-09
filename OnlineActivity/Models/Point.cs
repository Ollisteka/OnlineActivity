using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    internal sealed class Point
    {
        public double X { get; set; }

        public double Y { get; set; }
    }
}
