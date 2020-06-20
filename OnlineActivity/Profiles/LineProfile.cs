using System;
using AutoMapper;
using JetBrains.Annotations;
using OnlineActivity.Models;

namespace OnlineActivity.Profiles
{
    [UsedImplicitly]
    internal sealed class LineProfile : Profile
    {
        public LineProfile()
        {
            CreateMap<DrawLineDto, LineDtoToSend>();
        }
    }
}