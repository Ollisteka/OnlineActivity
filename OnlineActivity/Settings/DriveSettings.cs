using Newtonsoft.Json;

namespace OnlineActivity.Settings
{
    [JsonObject]
    internal sealed class DriveSettings
    {
        public string ConnectionString { get; set; }
    }
}
