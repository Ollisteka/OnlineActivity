using System;
using AutoMapper;
using JetBrains.Annotations;
using OnlineActivity.Models;

namespace OnlineActivity.Profiles
{
    [UsedImplicitly]
    internal sealed class ChatMessageProfile : Profile
    {
        public ChatMessageProfile()
        {
            CreateMap<ChatMessageDto, ChatMessageEntity>()
                .ForMember(_ => _.SendingTime,
                    options => options.MapFrom(_ => DateTime.UtcNow));

            CreateMap<ChatMessageEntity, ChatMessageToSendDto>();
        }
    }
}
