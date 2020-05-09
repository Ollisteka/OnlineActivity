using System;
using System.Threading.Tasks;
using OnlineActivity.Models;

namespace OnlineActivity.Repositories
{
    public interface IEntityRepository<TEntity>
        where TEntity: Entity
    {
        Task<TEntity> InsertAsync(TEntity entity);

        Task<TEntity> MergeAsync(TEntity entity);

        Task<TEntity> GetAsync(Guid id);
    }
}
