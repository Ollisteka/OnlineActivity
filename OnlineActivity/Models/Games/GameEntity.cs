using System;
using System.Collections.Generic;

namespace OnlineActivity.Models
{
    internal sealed class GameEntity: Entity
    {
        public GameStatus Status { get; set; }
        public IEnumerable<Guid> UserIds { get; set; }

        public GameEntity(GameStatus status, IEnumerable<Guid> userIds)
        {
            Status = status;
            UserIds = userIds;
        }
    }
}
