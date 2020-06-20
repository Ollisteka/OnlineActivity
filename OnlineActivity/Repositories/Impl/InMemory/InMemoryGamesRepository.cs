using System;
using System.Threading.Tasks;
using OnlineActivity.Models;

namespace OnlineActivity.Repositories
{
    internal sealed class InMemoryGamesRepository: InMemoryEntityRepositoryBase<GameEntity>, IGameRepository
    {
        Task<GameEntity> IGameRepository.AddUserToGameAsync(Guid gameId, Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<GameEntity> AddLineToGameAsync(Guid gameId, Line line)
        {
            throw new NotImplementedException();
        }
    }
}
