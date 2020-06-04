using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.SignalR;
using OnlineActivity.Models;

namespace OnlineActivity.Hubs
{
    [UsedImplicitly(ImplicitUseTargetFlags.WithMembers)]
    internal sealed class CanvasHub: Hub
    {
        [HubMethodName("DrawLine")]
        public Task DrawLineAsync(Line line)
        {
            return Clients.Others.SendAsync("DrawLine", line);
        }
    }
}
