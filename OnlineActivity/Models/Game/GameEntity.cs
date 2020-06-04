using System;
using System.Collections.Generic;

namespace OnlineActivity.Models.Game
{
    public sealed class GameEntity: Entity
    {
        public GameStatus Status { get; set; }

        public List<Guid> PlayersIds { get; set; } = new List<Guid>();

        public Guid CreatorId { get; set; }

        public DateTime CreationTime { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime FinishTime { get; set; }
    }
}
