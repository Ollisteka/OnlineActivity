using System;
using System.Collections.Generic;

namespace OnlineActivity.Models.Game
{
    public sealed class GameEntity: Entity
    {
        public GameStatus Status { get; set; }

        public IEnumerable<Guid> PlayersIds { get; set; }

        public Guid CreatorId { get; set; }

        public DateTime CreationTime { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime FinishTime { get; set; }

        public GameEntity(GameStatus status, IEnumerable<Guid> playersIds, Guid creatorId)
        {
            Status = status;
            PlayersIds = playersIds;
            CreatorId = creatorId;
        }
    }
}
