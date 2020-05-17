using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer.Repositories;
using IdentityServer4.Models;
using IdentityServer4.Stores;

namespace IdentityServer.Store
{
    internal sealed class MongoResourceStore: IResourceStore
    {
        private readonly IRepository<ApiResource> apiResourceRepository;
        private readonly IRepository<IdentityResource> identityResourceRepository;

        public MongoResourceStore(IRepository<ApiResource> apiResourceRepository, IRepository<IdentityResource> identityResourceRepository)
        {
            this.apiResourceRepository = apiResourceRepository;
            this.identityResourceRepository = identityResourceRepository;
        }

        public Task<IEnumerable<IdentityResource>> FindIdentityResourcesByScopeAsync(IEnumerable<string> scopeNames)
        {
            var list = identityResourceRepository.Where(e => scopeNames.Contains(e.Name));

            return Task.FromResult(list.AsEnumerable());
        }

        public Task<IEnumerable<ApiResource>> FindApiResourcesByScopeAsync(IEnumerable<string> scopeNames)
        {
            var list = apiResourceRepository.Where(a => a.Scopes.Any(s => scopeNames.Contains(s.Name)));

            return Task.FromResult(list.AsEnumerable());
        }

        public Task<ApiResource> FindApiResourceAsync(string name)
        {
            if (string.IsNullOrEmpty(name)) 
                throw new ArgumentNullException(nameof(name));

            return Task.FromResult(apiResourceRepository.Single(a => a.Name == name));
        }

        public Task<Resources> GetAllResourcesAsync()
        {
            var result = new Resources(GetAllIdentityResources(), GetAllApiResources());
            return Task.FromResult(result);
        }

        private IEnumerable<ApiResource> GetAllApiResources()
        {
            return apiResourceRepository.All();
        }

        private IEnumerable<IdentityResource> GetAllIdentityResources()
        {
            return identityResourceRepository.All();
        }
    }
}
