using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using OnlineActivity.Models;
using OnlineActivity.Settings;

namespace OnlineActivity.Repositories
{
    internal class MongoEntityRepositoryBase<TEntity> : IEntityRepository<TEntity>
        where TEntity : Entity
    {
        protected readonly IMongoCollection<TEntity> Collection;

        public MongoEntityRepositoryBase(IMongoClient mongoClient, IOptions<MongoSettings> mongoSettings)
        {
            Collection = mongoClient.GetDatabase(mongoSettings.Value.DatabaseName).GetCollection<TEntity>(typeof(TEntity).Name);
        }

        public async Task<TEntity> InsertAsync(TEntity entity)
        {
            if (entity.Id != Guid.Empty)
                throw new ArgumentException("Id of entity should be Guid.Empty", nameof(entity.Id));

            entity.Id = Guid.NewGuid();

            await Collection.InsertOneAsync(entity);

            return entity;
        }

        public async Task<TEntity> MergeAsync(TEntity entity)
        {
            if (entity.Id == Guid.Empty)
                throw new ArgumentException("Id of entity should not be Guid.Empty", nameof(entity.Id));

            await Collection.UpdateOneAsync(_ => _.Id == entity.Id, entity.ToBsonDocument());

            return entity;
        }

        public async Task<TEntity> GetAsync(Guid id)
        {
            var entity = await Collection.Find(_ => _.Id == id).SingleAsync();
            return entity;
        }
    }
}
