using System;
using System.Collections.Generic;
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

        public Task<GameEntity> AddLinesToGameAsync(Guid gameId, IEnumerable<Line> line)
        {
            throw new NotImplementedException();
        }

        public Task<GameEntity> AddMessageIdToGameAsync(Guid gameId, Guid messageId)
        {
            throw new NotImplementedException();
        }
    }
}
