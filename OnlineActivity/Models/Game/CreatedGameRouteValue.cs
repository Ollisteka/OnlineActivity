using System;
using Newtonsoft.Json;

namespace OnlineActivity.Models.Game
{
    public sealed class CreatedGameRouteValue
    {
        [JsonConstructor]
        public CreatedGameRouteValue(Guid gameId)
        {
            GameId = gameId;
        }

        [JsonProperty("gameId")]
        public Guid GameId { get; }
    }
    
}