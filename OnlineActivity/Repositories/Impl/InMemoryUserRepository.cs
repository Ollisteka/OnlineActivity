using OnlineActivity.Models.User;

namespace OnlineActivity.Repositories.Impl
{
    internal sealed class InMemoryUserRepository: InMemoryEntityRepositoryBase<UserEntity>, IUserRepository
    {
    }
}
