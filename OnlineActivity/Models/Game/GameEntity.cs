using System;
using System.Collections.Generic;

namespace OnlineActivity.Models
{
    public sealed class GameEntity: Entity
    {
        public GameStatus Status { get; set; }

        public List<Guid> PlayersIds { get; set; } = new List<Guid>();

        public Guid CreatorId { get; set; }

        public DateTime CreationTime { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? FinishTime { get; set; }

        public Guid DrawerPlayerId { get; set; }

        public List<Line> CanvasLines { get; set; } = new List<Line>();

        public List<Guid> ChatMessageIds { get; set; } = new List<Guid>();
    }
}
