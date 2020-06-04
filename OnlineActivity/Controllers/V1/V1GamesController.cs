using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineActivity.Models.Game;
using OnlineActivity.Models.User;
using OnlineActivity.Repositories;
using OnlineActivity.Result;

namespace OnlineActivity.Controllers.V1
{
    [Route("api/v1/games")]
    public sealed class V1GamesController : V1ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly IGameRepository gameRepository;
        private readonly IMapper mapper;

        public V1GamesController(IUserRepository userRepository, IGameRepository gameRepository, IMapper mapper)
        {
            this.userRepository = userRepository;
            this.gameRepository = gameRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateGameAsync([FromBody] GameToCreateDto gameToCreateDto)
        {
            var gameEntity = mapper.Map<GameEntity>(gameToCreateDto);
            gameEntity = await gameRepository.InsertAsync(gameEntity);
            var gameToSendDto = mapper.Map<GameToSendDto>(gameEntity);
            
            return CreatedAtRoute("GetGameById", 
                new CreatedGameRouteValue(gameToSendDto.Id), gameToSendDto);
        }

        [HttpGet("{gameId}", Name = "GetGameById")]
        public async Task<IActionResult> GetGameByIdAsync([FromRoute] Guid gameId)
        {
            var gameEntity = await gameRepository.GetAsync(gameId);
            var gameToSendDto = mapper.Map<GameToSendDto>(gameEntity);

            foreach (var playerId in gameEntity.PlayersIds)
            {
                var player = await userRepository.GetAsync(playerId);
                var playerToSend = mapper.Map<UserToSendDto>(player);
                gameToSendDto.Players.Add(playerToSend);
            }
            return Ok(gameToSendDto);
        }
    }
}
