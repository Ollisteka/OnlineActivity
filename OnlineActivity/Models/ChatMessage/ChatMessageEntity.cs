using System;

namespace OnlineActivity.Models
{
    public sealed class ChatMessageEntity: Entity
    {
        public DateTime SendingTime { get; set; } = DateTime.UtcNow;

        public Guid UserId { get; set; }

        public Guid GameId { get; set; }

        public string Message { get; set; }
    }
}
