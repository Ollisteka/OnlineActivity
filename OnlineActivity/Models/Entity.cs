using System;
using MongoDB.Bson.Serialization.Attributes;

namespace OnlineActivity.Models
{
    public abstract class Entity
    {
        [BsonId]
        public Guid Id { get; set; } = Guid.Empty;
    }
}
