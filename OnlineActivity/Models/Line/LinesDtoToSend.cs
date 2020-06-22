using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    public class LinesDtoToSend
    {
        [JsonProperty(PropertyName = "lines")]
        public List<Line> Lines { get; set; }
    }
}
