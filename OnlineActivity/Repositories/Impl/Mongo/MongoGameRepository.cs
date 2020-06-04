using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using OnlineActivity.Models.Game;
using OnlineActivity.Settings;

namespace OnlineActivity.Repositories
{
    internal sealed class MongoGameRepository: MongoEntityRepositoryBase<GameEntity>, IGameRepository
    {
        public MongoGameRepository(IMongoClient mongoClient, IOptions<MongoSettings> mongoSettings)
            : base(mongoClient, mongoSettings)
        {
        }

        public Task<GameEntity> AddUserToGameAsync(Guid gameId, Guid userId)
        {
            var update = Builders<GameEntity>.Update
                .Push(_ => _.PlayersIds, userId);

            return Collection.FindOneAndUpdateAsync(_ => _.Id == gameId, update);
        }
    }
}
