using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineActivity.Models;

namespace OnlineActivity.Repositories
{
    internal sealed class InMemoryUserRepository: InMemoryEntityRepositoryBase<UserEntity>, IUserRepository
    {
        public Task<UserEntity> InsertOrUpdateByLoginAsync(UserEntity userEntity)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<UserEntity>> GetUsersByPointsDescendingAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}
