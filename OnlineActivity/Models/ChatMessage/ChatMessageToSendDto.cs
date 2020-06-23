using System;
using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    public sealed class ChatMessageToSendDto
    {
        [JsonProperty(PropertyName = "messageId")]
        public Guid Id { get; set; }

        [JsonProperty(PropertyName = "gameId")]
        public Guid GameId { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public Guid UserId { get; set; }

        [JsonProperty(PropertyName = "userName")]
        public string UserName { get; set; }

        [JsonProperty(PropertyName = "message")]
        public string Message { get; set; }

        [JsonProperty(PropertyName = "sendingTime")]
        public DateTime SendingTime { get; set; }

        [JsonProperty(PropertyName = "reaction")]
        public Reaction Reaction { get; set; }
    }
}
