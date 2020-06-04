using System;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.SignalR;
using OnlineActivity.Models;
using OnlineActivity.Models.GameCreation;
using OnlineActivity.Repositories;

namespace OnlineActivity.Hubs
{
    [UsedImplicitly(ImplicitUseTargetFlags.WithMembers)]
    public class GameCreationHub: Hub
    {
        private readonly IGameRepository gameRepository;
        private readonly IUserRepository userRepository;

        public GameCreationHub(IGameRepository gameRepository, IUserRepository userRepository)
        {
            this.gameRepository = gameRepository;
            this.userRepository = userRepository;
        }

        [HubMethodName("AddToGroup")]
        public async Task AddToGroupAsync(ConnectToGameDto connectToGameDto)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connectToGameDto.GameId.ToString());
        }
        
        [HubMethodName("RemoveFromGroup")]
        public async Task RemoveFromGroupAsync(ConnectToGameDto connectToGameDto)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, connectToGameDto.GameId.ToString());
        }
        
        [HubMethodName("ConnectToGame")]
        public async Task ConnectToGameAsync(ConnectToGameDto connectToGameDto)
        {
            var user = await userRepository.GetAsync(connectToGameDto.UserId);
            var game = await gameRepository.GetAsync(connectToGameDto.GameId);

            if (game.Status != GameStatus.WaitingForTheStart)
            {
                await Clients.Caller.SendAsync("Error", new ErrorMessage { Id = "game-connection-error", Message = "You can not connect to this game" });
                return;
            }

            await gameRepository.AddUserToGameAsync(connectToGameDto.GameId, connectToGameDto.UserId);

            var groupName = connectToGameDto.GameId.ToString();

            var result = new UserConnectedDto
            {
                GameId = connectToGameDto.GameId,
                UserId = user.Id,
                UserLogin = user.Login
            };
            
            await Clients.Group(groupName).SendAsync("ConnectToGame", result);
        }

        [HubMethodName("StartGame")]
        public async Task StartGameAsync(StartGameDto startGameDto)
        {
            var game = await gameRepository.GetAsync(startGameDto.GameId);
            if (startGameDto.UserId != game.CreatorId)
            {
                await Clients.Caller.SendAsync("Error", new ErrorMessage { Id = "start-game-error", Message = "Only creator can start the game" });
                return;
            }
            
            game.StartTime = DateTime.UtcNow;
            game.Status = GameStatus.Active;

            await gameRepository.MergeAsync(game);


            var result = new GameStartedDto {GameId = game.Id, StartTime = DateTime.UtcNow};
            var groupName = game.Id.ToString();
            await Clients.Group(groupName).SendAsync("StartGame", result);
        }
    }
}
