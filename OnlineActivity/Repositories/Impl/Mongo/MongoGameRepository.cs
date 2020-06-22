using System;
using System.Collections.Generic;
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

        public Task<GameEntity> AddLinesToGameAsync(Guid gameId, IEnumerable<Line> lines)
        {
            var update = Builders<GameEntity>.Update
                .PushEach(_ => _.CanvasLines, lines);
            var options = new FindOneAndUpdateOptions<GameEntity> { ReturnDocument = ReturnDocument.After };

            return Collection.FindOneAndUpdateAsync<GameEntity, GameEntity>(_ => _.Id == gameId, update, options);
        }

        public Task<GameEntity> AddMessageIdToGameAsync(Guid gameId, Guid messageId)
        {
            var update = Builders<GameEntity>.Update
                .Push(_ => _.MessageIds, messageId);
            var options = new FindOneAndUpdateOptions<GameEntity> { ReturnDocument = ReturnDocument.After };

            return Collection.FindOneAndUpdateAsync<GameEntity, GameEntity>(_ => _.Id == gameId, update, options);
        }
    }
}
