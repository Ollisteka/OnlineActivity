using Newtonsoft.Json;

namespace OnlineActivity.Settings
{
    [JsonObject]
    internal sealed class MongoSettings
    {
        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }
    }
}
