using System;
using Newtonsoft.Json;

namespace OnlineActivity.Models.GameCreation
{
    [JsonObject]
    public class GameStartedDto
    {
        [JsonProperty(PropertyName = "gameId")]
        public Guid GameId { get; set; }

        [JsonProperty(PropertyName = "startTime")]
        public DateTime StartTime { get; set; }
    }
}
