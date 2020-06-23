using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OnlineActivity.Extensions;
using OnlineActivity.Models;

namespace OnlineActivity.Repositories
{
    public class InMemoryGameWordRepository: InMemoryEntityRepositoryBase<GameWordEntity>, IGameWordRepository
    {
        public InMemoryGameWordRepository()
        {
            var gameWords = new List<GameWordEntity>
            {
                new GameWordEntity{Id=Guid.NewGuid(), Word = "простата"},
                new GameWordEntity{Id=Guid.NewGuid(), Word ="Слуцкий"},
                new GameWordEntity{Id=Guid.NewGuid(), Word ="сессия"},
                new GameWordEntity{Id=Guid.NewGuid(), Word ="катастрофа"},
                new GameWordEntity{Id=Guid.NewGuid(), Word ="несправедливость"},
                new GameWordEntity{Id=Guid.NewGuid(), Word ="усталость"},
                new GameWordEntity{Id=Guid.NewGuid(), Word ="чума"}
            };

            foreach (var word in gameWords)
            {
                Repository[word.Id] = word;
            }
        }
       

        public Task<GameWordEntity> GetRandomAsync()
        {
            var values = Repository.Values.ToList();
            return Task.FromResult(values.GetRandomItem());
        }
    }
}
