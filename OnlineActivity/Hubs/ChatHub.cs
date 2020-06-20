using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.SignalR;
using OnlineActivity.Models;

namespace OnlineActivity.Hubs
{
    [UsedImplicitly(ImplicitUseTargetFlags.WithMembers)]
    internal sealed class ChatHub : Hub
    {
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


        public async Task SendChatMessage(ChatMessageDto chatMessageDto)
        {
            //await Clients.All.SendAsync("SendChatMessage", message);
        }
    }
}
