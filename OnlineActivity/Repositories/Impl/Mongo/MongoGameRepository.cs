using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using OnlineActivity.Models;
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
            var options = new FindOneAndUpdateOptions<GameEntity> {ReturnDocument = ReturnDocument.After};
            
            return Collection.FindOneAndUpdateAsync<GameEntity, GameEntity>(_ => _.Id == gameId, update, options);
        }

        public Task<GameEntity> AddLineToGameAsync(Guid gameId, Line line)
        {
            var update = Builders<GameEntity>.Update
                .Push(_ => _.CanvasLines, line);
            var options = new FindOneAndUpdateOptions<GameEntity> { ReturnDocument = ReturnDocument.After };

            return Collection.FindOneAndUpdateAsync<GameEntity, GameEntity>(_ => _.Id == gameId, update, options);
        }
    }
}
