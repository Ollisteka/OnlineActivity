using System;
using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    public sealed class ChatMessageDto
    {
        [JsonProperty(PropertyName = "gameId")]
        public Guid GameId { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public Guid UserId { get; set; }

        [JsonProperty(PropertyName = "message")]
        public string Message { get; set; }
    }
}
