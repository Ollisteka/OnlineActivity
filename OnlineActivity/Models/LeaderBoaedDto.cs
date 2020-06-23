using System.Collections.Generic;
using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    public class LeaderBoardDto
    {
        [JsonProperty(PropertyName = "users")]
        public List<UserToSendDto> Users { get; set; } = new List<UserToSendDto>();
    }
}
