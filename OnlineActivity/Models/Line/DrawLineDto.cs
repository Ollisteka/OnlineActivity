using System;
using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    public sealed class DrawLineDto
    {
        [JsonProperty(PropertyName = "line")]
        public Line Line { get; set; }

        [JsonProperty(PropertyName = "gameId")]
        public Guid GameId { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public Guid UserId { get; set; }
    }
}
