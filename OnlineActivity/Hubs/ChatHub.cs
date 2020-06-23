using System;
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
        private readonly IUserRepository userRepository;
        private readonly IChatMessageRepository chatMessageRepository;
        private readonly IMapper mapper;

        public ChatHub(IGameRepository gameRepository, IUserRepository userRepository, IChatMessageRepository chatMessageRepository, IMapper mapper)
        {
            this.gameRepository = gameRepository;
            this.userRepository = userRepository;
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
            var chatMessageEntity = mapper.Map<ChatMessageEntity>(chatMessageDto);
            await chatMessageRepository.InsertAsync(chatMessageEntity);
            await gameRepository.AddMessageIdToGameAsync(chatMessageDto.GameId, chatMessageEntity.Id);

            var chatMessageToSendDto = mapper.Map<ChatMessageToSendDto>(chatMessageEntity);
            var sender = await userRepository.GetAsync(chatMessageDto.UserId);
            chatMessageToSendDto.UserName = sender.Login;

            var groupName = chatMessageDto.GameId.ToString();
            await Clients.Group(groupName).SendAsync("SendChatMessage", chatMessageToSendDto);
        }

        [HubMethodName("SendReaction")]
        public async Task SendReactionAsync(ReactionDto reactionDto)
        {
            var game = await gameRepository.GetAsync(reactionDto.GameId);
            if (game.DrawerPlayerId != reactionDto.UserId)
            {
                await Clients.Caller.SendAsync("Error", new ErrorMessage { Id = "send-reaction-error", Message = "Only selected drawer can draw on canvas" });
                    return;
            }
            var message = await chatMessageRepository.GetAsync(reactionDto.MessageId);

            message.Reaction = reactionDto.Reaction;
            await chatMessageRepository.MergeAsync(message);

            if (message.Reaction == Reaction.Correct)
            {
                game.FinishTime = DateTime.UtcNow;
                await gameRepository.MergeAsync(game);
            }

            var groupName = reactionDto.GameId.ToString();
            var reactionToSendDto = mapper.Map<ReactionToSendDto>(reactionDto);
            await Clients.Group(groupName).SendAsync("SendReaction", reactionToSendDto);
        }
    }
}
