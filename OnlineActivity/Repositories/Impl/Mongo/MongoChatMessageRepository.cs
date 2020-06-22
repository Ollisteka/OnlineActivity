using Microsoft.Extensions.Options;
using MongoDB.Driver;
using OnlineActivity.Models;
using OnlineActivity.Settings;

namespace OnlineActivity.Repositories
{
    internal sealed class MongoChatMessageRepository : MongoEntityRepositoryBase<ChatMessageEntity>, IChatMessageRepository
    {
        public MongoChatMessageRepository(IMongoClient mongoClient, IOptions<MongoSettings> mongoSettings) : base(mongoClient, mongoSettings)
        {
        }
    }
}
