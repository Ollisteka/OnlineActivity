using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    internal sealed class Line
    {
        public Point Start { get; set; }

        public Point End { get; set; }
    }
}
