using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using OnlineActivity.Models.User;
using OnlineActivity.Settings;

namespace OnlineActivity.Repositories
{
    internal sealed class MongoUserRepository: MongoEntityRepositoryBase<UserEntity>, IUserRepository
    {
        public MongoUserRepository(IMongoClient mongoClient, IOptions<MongoSettings> mongoSettings) : base(mongoClient, mongoSettings)
        {
        }

        public async Task<UserEntity> InsertOrUpdateByLoginAsync(UserEntity userEntity)
        {
            if (userEntity.Id != Guid.Empty)
                throw new ArgumentException("Id of entity should be Guid.Empty", nameof(userEntity.Id));

            var user = await Collection.Find(_ => _.Login == userEntity.Login).SingleOrDefaultAsync();
             
            if (user == null)
            {
                userEntity.Id = Guid.NewGuid();
                await Collection.InsertOneAsync(userEntity);
            }
            else
            {
                userEntity.Id = user.Id;
                await Collection.ReplaceOneAsync(_ => _.Id == userEntity.Id, userEntity);
            }

            return userEntity;
        } 
    }
}
