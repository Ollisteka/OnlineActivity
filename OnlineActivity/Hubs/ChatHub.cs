using System.Threading.Tasks;
using AutoMapper;
using JetBrains.Annotations;
using Microsoft.AspNetCore.SignalR;
using OnlineActivity.Models;
using OnlineActivity.Repositories;

namespace OnlineActivity.Hubs
{
    [UsedImplicitly(ImplicitUseTargetFlags.WithMembers)]
    internal sealed class ChatHub : Hub
    {
        private readonly IGameRepository gameRepository;
        private readonly IChatMessageRepository chatMessageRepository;
        private readonly IMapper mapper;

        public ChatHub(IGameRepository gameRepository, IChatMessageRepository chatMessageRepository, IMapper mapper)
        {
            this.gameRepository = gameRepository;
            this.chatMessageRepository = chatMessageRepository;
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

        [HubMethodName("SendChatMessage")]
        public async Task SendChatMessageAsync(ChatMessageDto chatMessageDto)
        {
            var chatMessage = mapper.Map<ChatMessageEntity>(chatMessageDto);
            await gameRepository.AddMessageToGameAsync(chatMessageDto.GameId, chatMessage);
            
            var groupName = chatMessageDto.GameId.ToString();
            await Clients.GroupExcept(groupName, Context.ConnectionId).SendAsync("SendChatMessage", chatMessageDto);
        }

        [HubMethodName("SendReactionAsync")]
        public async Task SendReactionAsync(ChatMessageDto chatMessageDto)
        {

        }
    }
}
