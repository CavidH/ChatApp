using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Hubs
{
    public class ChatHub:Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        public async Task AddGroupAsync(string group)
        { 
            await Groups.AddToGroupAsync(Context.ConnectionId, group);
        }

    }
}