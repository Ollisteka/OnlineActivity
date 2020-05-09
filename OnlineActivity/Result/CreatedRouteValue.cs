using System;
using Newtonsoft.Json;

namespace OnlineActivity.Result
{
    [JsonObject]
    public sealed class CreatedRouteValue
    {
        [JsonConstructor]
        public CreatedRouteValue(Guid userId)
        {
            UserId = userId;
        }

        [JsonProperty("approveId")]
        public Guid UserId { get; }
    }
}
