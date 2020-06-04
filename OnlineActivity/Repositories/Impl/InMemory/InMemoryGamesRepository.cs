using System;
using System.Threading.Tasks;
using OnlineActivity.Models.Game;

namespace OnlineActivity.Repositories
{
    internal sealed class InMemoryGamesRepository: InMemoryEntityRepositoryBase<GameEntity>, IGameRepository
    {
        Task<GameEntity> IGameRepository.AddUserToGameAsync(Guid gameId, Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}
