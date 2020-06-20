using System.Threading.Tasks;
using OnlineActivity.Models;

namespace OnlineActivity.Repositories
{
    public interface IUserRepository: IEntityRepository<UserEntity>
    {
        public Task<UserEntity> InsertOrUpdateByLoginAsync(UserEntity userEntity);
    }
}
