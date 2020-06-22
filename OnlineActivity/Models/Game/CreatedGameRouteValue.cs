using System;
using Newtonsoft.Json;

namespace OnlineActivity.Models
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