using AutoMapper;
using JetBrains.Annotations;
using OnlineActivity.Models;

namespace OnlineActivity.Profiles
{
    [UsedImplicitly]
    internal sealed class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserToCreateDto, UserEntity>();
            CreateMap<UserEntity, UserToSendDto>();
            CreateMap<UserToPutDto, UserEntity>();
        }
    }
}