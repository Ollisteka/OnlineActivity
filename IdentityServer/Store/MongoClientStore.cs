using System.Threading.Tasks;
using IdentityServer.Repositories;
using IdentityServer4.Models;
using IdentityServer4.Stores;
using MongoDB.Driver;

namespace IdentityServer.Store
{
    internal sealed class MongoClientStore: IClientStore
    {
        private readonly IRepository<Client> clientRepository;

        public MongoClientStore(IRepository<Client> clientRepository)
        {
            this.clientRepository = clientRepository;
        }

        public Task<Client> FindClientByIdAsync(string clientId)
        {
            var client = clientRepository.Single(c => c.ClientId == clientId);

            return Task.FromResult(client);
        }
    }
}
