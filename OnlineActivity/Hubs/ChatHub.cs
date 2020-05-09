using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace OnlineActivity.Hubs
{
    internal sealed class ChatHub : Hub
    {
        public async Task SendMessage(string nickname,string message)
        {
            await this.Clients.All.SendAsync("send", message);
        }
    }
}
