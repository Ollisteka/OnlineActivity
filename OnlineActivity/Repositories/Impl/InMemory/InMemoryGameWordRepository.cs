using OnlineActivity.Models;

namespace OnlineActivity.Repositories
{
    public class InMemoryGameWordRepository: InMemoryEntityRepositoryBase<GameWordEntity>, IGameWordRepository
    {
        public GameWordEntity GetRandomAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}
