namespace OnlineActivity.Models.User
{
    public sealed class UserEntity: Entity
    {
        public string Name { get; set; }

        public UserEntity(string name)
        {
            Name = name;
        }
    }
}
