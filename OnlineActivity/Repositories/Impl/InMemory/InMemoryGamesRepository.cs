using System;
using System.Threading.Tasks;
using OnlineActivity.Models.Game;

namespace OnlineActivity.Repositories
{
    internal sealed class InMemoryGamesRepository: InMemoryEntityRepositoryBase<GameEntity>, IGameRepository
    {
        public Task AddUserToGameAsync(Guid gameId, Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}
