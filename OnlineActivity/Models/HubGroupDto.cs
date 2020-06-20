using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    public sealed class HubGroupDto
    {
        [JsonProperty(PropertyName = "userId")]
        public Guid UserId { get; set; }

        [JsonProperty(PropertyName = "gameId")]
        public Guid GameId { get; set; }
    }
}
