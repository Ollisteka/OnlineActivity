using Newtonsoft.Json;

namespace IdentityServer.Settings
{
    [JsonObject]
    internal sealed class MongoSettings
    {
        public string DatabaseName { get; set; }

        public string ConnectionString { get; set; }

        public string DatabaseConnectionString { get; set; }
    }
}
