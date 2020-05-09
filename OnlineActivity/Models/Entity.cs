using System;

namespace OnlineActivity.Models
{
    public abstract class Entity
    {
        public Guid Id { get; set; } = Guid.Empty;
    }
}
