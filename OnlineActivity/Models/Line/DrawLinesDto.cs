using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    public sealed class DrawLinesDto
    {
        [JsonProperty(PropertyName = "lines")]
        public List<Line> Lines { get; set; }

        [JsonProperty(PropertyName = "gameId")]
        public Guid GameId { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public Guid UserId { get; set; }
    }
}
