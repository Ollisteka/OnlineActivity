﻿using System.Text.Json.Serialization;

namespace OnlineActivity.Models.User
{
    public sealed class UserEntity: Entity
    {
        public string Login { get; set; }

        public string Email { get; set; }

        public string IdentityId { get; set; }

        public UserEntity(string login, string email, string identityId)
        {
            Login = login;
            Email = email;
            IdentityId = identityId;
        }
    }
}
