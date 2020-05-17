using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OnlineActivity.Repositories;
using OnlineActivity.Repositories.Impl;
using MongoDB.Driver;
using OnlineActivity.Settings;

namespace OnlineActivity.Extensions
{
    internal static class IServiceCollectionExtensions
    {
        public static void AddRepositories(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<IUserRepository, InMemoryUserRepository>();
        }

        public static void AddClients(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            var driveSettings = configuration.GetSection("Drive").Get<DriveSettings>();
            var client = new MongoClient(driveSettings.ConnectionString);
            serviceCollection.AddSingleton<IMongoClient>(client);
        }
    }
}