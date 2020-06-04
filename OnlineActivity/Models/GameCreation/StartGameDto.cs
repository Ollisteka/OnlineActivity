using System;
using Newtonsoft.Json;

namespace OnlineActivity.Models.GameCreation
{
    [JsonObject]
    public class StartGameDto
    {
        [JsonProperty(PropertyName = "userId")]
        public Guid UserId { get; set; }

        [JsonProperty(PropertyName = "gameId")]
        public Guid GameId { get; set; }
    }
}
