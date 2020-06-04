using System;
using Newtonsoft.Json;

namespace OnlineActivity.Models.GameCreation
{
    [JsonObject]
    public sealed class ConnectToGameDto
    {
        [JsonProperty(PropertyName = "userId")]
        public Guid UserId { get; set; }

        [JsonProperty(PropertyName = "gameId")]
        public Guid GameId { get; set; }
    }
}
