﻿using System.Threading.Tasks;
using OnlineActivity.Models.User;

namespace OnlineActivity.Repositories
{
    internal sealed class InMemoryUserRepository: InMemoryEntityRepositoryBase<UserEntity>, IUserRepository
    {
        public Task<UserEntity> InsertOrUpdateByLoginAsync(UserEntity userEntity)
        {
            throw new System.NotImplementedException();
        }
    }
}