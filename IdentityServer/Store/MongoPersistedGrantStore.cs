using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer.Repositories;
using IdentityServer4.Models;
using IdentityServer4.Stores;

namespace IdentityServer.Store
{
    internal sealed class MongoPersistedGrantStore: IPersistedGrantStore
    {
        private readonly IRepository<PersistedGrant> persistedGrantRepository;

        public MongoPersistedGrantStore(IRepository<PersistedGrant> persistedGrantRepository)
        {
            this.persistedGrantRepository = persistedGrantRepository;
        }

        public Task StoreAsync(PersistedGrant grant)
        {
            persistedGrantRepository.Add(grant);
            return Task.FromResult(0);
        }

        public Task<PersistedGrant> GetAsync(string key)
        {
            var result = persistedGrantRepository.Single(i => i.Key == key);
            return Task.FromResult(result);
        }

        public Task<IEnumerable<PersistedGrant>> GetAllAsync(string subjectId)
        {
            var result = persistedGrantRepository.Where(i => i.SubjectId == subjectId);
            return Task.FromResult(result.AsEnumerable());
        }

        public Task RemoveAsync(string key)
        {
            persistedGrantRepository.Delete(i => i.Key == key);
            return Task.FromResult(0);
        }

        public Task RemoveAllAsync(string subjectId, string clientId)
        {
            persistedGrantRepository.Delete(i => i.SubjectId == subjectId && i.ClientId == clientId);
            return Task.FromResult(0);
        }

        public Task RemoveAllAsync(string subjectId, string clientId, string type)
        {
            persistedGrantRepository.Delete(i => i.SubjectId == subjectId && i.ClientId == clientId && i.Type == type);
            return Task.FromResult(0);
        }
    }
}
