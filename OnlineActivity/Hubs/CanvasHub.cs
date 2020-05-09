using System;
using System.Collections.Generic;
using System.IO.Pipes;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using OnlineActivity.Models;

namespace OnlineActivity.Hubs
{
    internal sealed class CanvasHub: Hub
    {
        public Task DrawLine(Line line)
        {
            return Clients.Others.SendAsync("DrawLine", line);
        }
    }
}
