using JetBrains.Annotations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OnlineActivity.Repositories;
using MongoDB.Driver;
using OnlineActivity.Settings;

namespace OnlineActivity.Extensions
{
    [UsedImplicitly]
    internal static class ServiceCollectionExtensions
    {
        public static void AddRepositories(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<IUserRepository, MongoUserRepository>();
        }

        public static void AddSettings(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            serviceCollection.Configure<MongoSettings>(configuration.GetSection("Mongo"));
        }

        public static void AddClients(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            var mongoSettings = configuration.GetSection("Mongo").Get<MongoSettings>();
            var client = new MongoClient(mongoSettings.ConnectionString);
            serviceCollection.AddSingleton<IMongoClient>(client);
        }
    }
}