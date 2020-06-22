using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineActivity.Models;

namespace OnlineActivity.Repositories
{
    public interface IGameRepository : IEntityRepository<GameEntity>
    {
        public Task<GameEntity> AddUserToGameAsync(Guid gameId, Guid userId);

        public Task<GameEntity> AddLinesToGameAsync(Guid gameId, IEnumerable<Line> line);

        public Task<GameEntity> AddMessageIdToGameAsync(Guid gameId, Guid messageId);
    }
}
