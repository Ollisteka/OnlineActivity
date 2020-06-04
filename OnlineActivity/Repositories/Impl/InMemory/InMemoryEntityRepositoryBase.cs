using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineActivity.Models;

namespace OnlineActivity.Repositories
{
    internal class InMemoryEntityRepositoryBase<TEntity> : IEntityRepository<TEntity>
        where TEntity: Entity
    {
        protected Dictionary<Guid, TEntity> Repository = new Dictionary<Guid, TEntity>();

        public Task<TEntity> InsertAsync(TEntity entity)
        {
            if (entity.Id != Guid.Empty)
                throw new ArgumentException("Id of entity should be Guid.Empty", nameof(entity.Id));

            entity.Id = Guid.NewGuid();
            Repository[entity.Id] = entity;

            return Task.FromResult(entity);
        }

        public Task<TEntity> MergeAsync(TEntity entity)
        {
            if (entity.Id == Guid.Empty)
                throw new ArgumentException("Id of entity should be Guid.Empty", nameof(entity.Id));

            Repository[entity.Id] = entity;

            return Task.FromResult(entity);
        }

        public Task<TEntity> GetAsync(Guid id)
        {
            return Task.FromResult(Repository[id]);
        }
    }
}
