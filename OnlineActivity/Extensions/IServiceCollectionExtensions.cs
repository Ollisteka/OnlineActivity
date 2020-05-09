using Microsoft.Extensions.DependencyInjection;
using OnlineActivity.Repositories;
using OnlineActivity.Repositories.Impl;

namespace OnlineActivity.Extensions
{
    internal static class IServiceCollectionExtensions
    {
        public static void AddRepositories(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<IUserRepository, InMemoryUserRepository>();
        }
    }
}