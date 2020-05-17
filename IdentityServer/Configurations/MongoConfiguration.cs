using Newtonsoft.Json;

namespace IdentityServer.Configurations
{
    [JsonObject]
    internal sealed class MongoConfiguration
    {
        public string DatabaseName { get; set; }

        public string ConnectionString { get; set; }
    }
}
