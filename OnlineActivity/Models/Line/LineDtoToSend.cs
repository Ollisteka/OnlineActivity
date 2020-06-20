using System;
using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    public class LineDtoToSend
    {
        [JsonProperty(PropertyName = "line")]
        public Line Line { get; set; }
    }
}
