using System;
using Newtonsoft.Json;

namespace OnlineActivity.Models.GameCreation
{
    [JsonObject]
    public sealed class UserConnectedDto
    {
        [JsonProperty(PropertyName = "userId")]
        public Guid UserId { get; set; }

        [JsonProperty(PropertyName = "gameId")]
        public Guid GameId { get; set; }

        [JsonProperty(PropertyName = "userLogin")]
        public string UserLogin { get; set; }
    }
}
