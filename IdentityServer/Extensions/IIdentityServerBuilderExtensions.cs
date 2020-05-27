using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer.Repositories;
using IdentityServer.Settings;
using IdentityServer.Store;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace IdentityServer.Extensions
{
    internal static class IIdentityServerBuilderExtensions
    {
        public static IIdentityServerBuilder AddMongoRepositories(this IIdentityServerBuilder builder, IConfiguration configuration)
        {
            var mongoConfiguration = configuration.GetSection("Mongo").Get<MongoSettings>();
            var mongoClient = new MongoClient(mongoConfiguration.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(mongoConfiguration.DatabaseName);
            builder.Services.AddSingleton(mongoDatabase);

            builder.Services.AddSingleton<IRepository<Client>, MongoRepository<Client>>();
            builder.Services.AddSingleton<IRepository<PersistedGrant>, MongoRepository<PersistedGrant>>();
            builder.Services.AddSingleton<IRepository<IdentityResource>, MongoRepository<IdentityResource>>();
            builder.Services.AddSingleton<IRepository<ApiResource>, MongoRepository<ApiResource>>();

            return builder;
        }

        public static IIdentityServerBuilder AddMongoClientStore(this IIdentityServerBuilder builder)
        {
            builder.Services.AddTransient<IClientStore, MongoClientStore>();
            builder.Services.AddTransient<ICorsPolicyService, InMemoryCorsPolicyService>();

            return builder;
        }

        public static IIdentityServerBuilder AddMongoIdentityApiResources(this IIdentityServerBuilder builder)
        {
            builder.Services.AddTransient<IResourceStore, MongoResourceStore>();

            return builder;
        }

        public static IIdentityServerBuilder AddMongoPersistedGrantStore(this IIdentityServerBuilder builder)
        {
            builder.Services.AddSingleton<IPersistedGrantStore, MongoPersistedGrantStore>();

            return builder;
        }
    }
}
