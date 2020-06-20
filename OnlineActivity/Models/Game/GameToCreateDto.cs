using System;
using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    public sealed class GameToCreateDto
    {
        [JsonProperty(PropertyName = "creatorId")]
        public Guid CreatorId { get; set; }
    }
}
