using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using JetBrains.Annotations;
using Microsoft.AspNetCore.SignalR;
using OnlineActivity.Models;
using OnlineActivity.Repositories;

namespace OnlineActivity.Hubs
{
    [UsedImplicitly(ImplicitUseTargetFlags.WithMembers)]
    public sealed class CanvasHub: Hub
    {
        private readonly IGameRepository gameRepository;
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public CanvasHub(IGameRepository gameRepository, IUserRepository userRepository, IMapper mapper)
        {
            this.gameRepository = gameRepository;
            this.userRepository = userRepository;
            this.mapper = mapper;
        }

        [HubMethodName("AddToGroup")]
        public async Task AddToGroupAsync(HubGroupDto hubGroupDto)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, hubGroupDto.GameId.ToString());
        }

        [HubMethodName("RemoveFromGroup")]
        public async Task RemoveFromGroupAsync(HubGroupDto hubGroupDto)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, hubGroupDto.GameId.ToString());
        }

        [HubMethodName("DrawLine")]
        public async Task DrawLineAsync(DrawLineDto drawLineDto)
        {
            var sender = await userRepository.GetAsync(drawLineDto.UserId);
            var game = await gameRepository.GetAsync(drawLineDto.GameId);
            //if (sender.Id != game.DrawerPlayerId)
            //{
            //    await Clients.Caller.SendAsync("Error", new ErrorMessage { Id = "draw-line-error", Message = "Only selected drawer can draw on canvas" });
            //    return;
            //}

            var updated = await gameRepository.AddLineToGameAsync(game.Id, drawLineDto.Line);
            var result = mapper.Map<LineDtoToSend>(drawLineDto);
            var groupName = game.Id.ToString();
            await Clients.Group(groupName).SendAsync("DrawLine", result);
        }
    }
}
