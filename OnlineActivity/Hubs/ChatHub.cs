using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.SignalR;

namespace OnlineActivity.Hubs
{
    [UsedImplicitly(ImplicitUseTargetFlags.WithMembers)]
    internal sealed class ChatHub : Hub
    {
        public async Task SendChatMessage(string nickname,string message)
        {
            await Clients.All.SendAsync("SendChatMessage", message);
        }
    }
}
