using System.Threading.Tasks;
using OnlineActivity.Models.User;

namespace OnlineActivity.Repositories
{
    public interface IUserRepository: IEntityRepository<UserEntity>
    {
        public Task<UserEntity> InsertOrUpdateByLoginAsync(UserEntity userEntity);
    }
}
