using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace OnlineActivity.Models
{
    [JsonObject]
    public class GameToSendDto
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("status")]
        public GameStatus Status { get; set; }

        [JsonPropertyName("players")]
        public List<UserToSendDto> Players { get; set; } = new List<UserToSendDto>();

        [JsonPropertyName("creatorId")]
        public Guid CreatorId { get; set; }

        [JsonPropertyName("gameStartTime")]
        public DateTime? GameStartTime { get; set; }

        [JsonPropertyName("gameFinishTime")]
        public DateTime? GameFinishTime { get; set; }

        [JsonPropertyName("canvasLines")]
        public List<Line> CanvasLines { get; set; } = new List<Line>();

        [JsonPropertyName("drawerPlayerId")]
        public Guid DrawerPlayerId { get; set; }

        [JsonPropertyName("chatMessages")]
        public List<ChatMessageToSendDto> ChatMessages { get; set; } = new List<ChatMessageToSendDto>();

    }
}