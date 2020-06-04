using System;
using AutoMapper;
using JetBrains.Annotations;
using OnlineActivity.Models;
using OnlineActivity.Models.Game;

namespace OnlineActivity.Profiles
{
    [UsedImplicitly]
    internal sealed class GameProfile : Profile
    {
        public GameProfile()
        {
            CreateMap<GameToCreateDto, GameEntity>()
                .ForMember(_ => _.CreationTime,
                    options => options.MapFrom(_ => DateTime.UtcNow))
                .ForMember(_ => _.Status,
                    options => options.MapFrom(_ => GameStatus.WaitingForTheStart));
            CreateMap<GameEntity, GameToSendDto>();
        }
    }
}
