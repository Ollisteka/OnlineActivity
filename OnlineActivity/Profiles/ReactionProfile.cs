using AutoMapper;
using JetBrains.Annotations;
using OnlineActivity.Models;

namespace OnlineActivity.Profiles
{
    [UsedImplicitly]
    internal sealed class ReactionProfile: Profile
    {
        public ReactionProfile()
        {
            CreateMap<ReactionDto, ReactionToSendDto>();
        }
    }
}
