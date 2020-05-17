using System;
using IdentityServer.Extensions;
using IdentityServer.Repositories;
using IdentityServer.Store;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MongoDB.Bson.Serialization;

namespace IdentityServer
{
    public class Startup
    {
        private readonly IWebHostEnvironment environment;
        private readonly IConfiguration configuration;

        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            this.environment = environment;
            this.configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddCors(setup =>
            {
                setup.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyHeader();
                    policy.AllowAnyMethod();
                    policy.WithOrigins("https://localhost:5001");
                    policy.AllowCredentials();
                });
            });


            services.AddMvcCore().SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Latest);

            var builder = services.AddIdentityServer(options =>
                {
                    options.UserInteraction.LoginUrl = "/";
                    options.UserInteraction.ErrorUrl = "/error";
                    options.UserInteraction.LogoutUrl = "/logout";


                    if (!string.IsNullOrEmpty(configuration["Issuer"]))
                    {
                        options.IssuerUri = configuration["Issuer"];
                    }
                })
                .AddMongoRepositories(configuration)
                .AddMongoClientStore()
                .AddMongoPersistedGrantStore()
                .AddMongoIdentityApiResources()
                .AddTestUsers(Config.GetTestUsers());

            if (environment.IsDevelopment())
            {
                builder.AddDeveloperSigningCredential();
            }
            else
            {
                throw new Exception("need to configure key material");
            }

            services.AddSpaStaticFiles(c =>
            {
                c.RootPath = "ClientApp/build";
            });


            services.AddControllers();

            var cors = new DefaultCorsPolicyService(new LoggerFactory().CreateLogger<DefaultCorsPolicyService>())
            {
                AllowAll = true
            };
            services.AddSingleton<ICorsPolicyService>(cors);
        }

        public void Configure(IApplicationBuilder app)
        {
            if (environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseSpaStaticFiles();

            app.UseCors();

            app.UseRouting();

            app.UseIdentityServer();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (environment.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            ConfigureMongoDriver2IgnoreExtraElements();
            InitializeDatabase(app);
        }

        public void InitializeDatabase(IApplicationBuilder app)
        {
            var clientRepository = app.ApplicationServices.GetService<IRepository<Client>>();
            var identityResourceRepository = app.ApplicationServices.GetService<IRepository<IdentityResource>>();
            var apiResourceRepository = app.ApplicationServices.GetService<IRepository<ApiResource>>();

            if (!clientRepository.CollectionExists())
            {
                foreach (var client in Config.GetClients())
                {
                    clientRepository.Add(client);
                }
            }

            if (!identityResourceRepository.CollectionExists())
            {
                foreach (var resource in Config.GetIdentityResources())
                {
                    identityResourceRepository.Add(resource);
                }
            }

            if (!apiResourceRepository.CollectionExists())
            {
                foreach (var resource in Config.GetApis())
                {
                    apiResourceRepository.Add(resource);
                }
            }
        }

        private static void ConfigureMongoDriver2IgnoreExtraElements()
        {
            BsonClassMap.RegisterClassMap<Client>(cm =>
            {
                cm.AutoMap();
                cm.SetIgnoreExtraElements(true);
            });
            BsonClassMap.RegisterClassMap<IdentityResource>(cm =>
            {
                cm.AutoMap();
                cm.SetIgnoreExtraElements(true);
            });
            BsonClassMap.RegisterClassMap<ApiResource>(cm =>
            {
                cm.AutoMap();
                cm.SetIgnoreExtraElements(true);
            });
            BsonClassMap.RegisterClassMap<PersistedGrant>(cm =>
            {
                cm.AutoMap();
                cm.SetIgnoreExtraElements(true);
            });
        }
    }
}