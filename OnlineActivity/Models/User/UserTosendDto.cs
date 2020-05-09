using System;
using Newtonsoft.Json;

namespace OnlineActivity.Models.User
{
    [JsonObject]
    public class UserToSendDto
    {
        public string Name { get; set; }

        public Guid Id { get; set; }
    }
}
