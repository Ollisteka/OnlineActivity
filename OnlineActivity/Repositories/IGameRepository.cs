using System;
using System.Threading.Tasks;
using OnlineActivity.Models;

namespace OnlineActivity.Repositories
{
    public interface IGameRepository : IEntityRepository<GameEntity>
    {
        public Task<GameEntity> AddUserToGameAsync(Guid gameId, Guid userId);

        public Task<GameEntity> AddLineToGameAsync(Guid gameId, Line line);
    }
}
