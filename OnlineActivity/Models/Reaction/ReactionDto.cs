using System;
using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    public sealed class ReactionDto
    {
        [JsonProperty(PropertyName = "gameId")]
        public Guid GameId { get; set; }

        [JsonProperty(PropertyName = "messageId")]
        public Guid MessageId { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public Guid UserId { get; set; }

        [JsonProperty(PropertyName = "reaction")]
        public Reaction Reaction { get; set; }
    }
}
