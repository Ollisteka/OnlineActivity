using System;
using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    public sealed class ReactionToSendDto
    {
        [JsonProperty(PropertyName = "messageId")]
        public Guid MessageId { get; set; }

        [JsonProperty(PropertyName = "reaction")]
        public Reaction Reaction { get; set; }
    }
}
