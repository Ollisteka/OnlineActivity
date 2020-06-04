using System;
using Newtonsoft.Json;

namespace OnlineActivity.Result
{
    [JsonObject]
    public sealed class CreatedUserRouteValue
    {
        [JsonConstructor]
        public CreatedUserRouteValue(Guid userId)
        {
            UserId = userId;
        }

        [JsonProperty("userId")]
        public Guid UserId { get; }
    }
}
