using System;
using System.Threading.Tasks;
using OnlineActivity.Models.Game;

namespace OnlineActivity.Repositories
{
    public interface IGameRepository : IEntityRepository<GameEntity>
    {
        public Task<GameEntity> AddUserToGameAsync(Guid gameId, Guid userId);
    }
}
