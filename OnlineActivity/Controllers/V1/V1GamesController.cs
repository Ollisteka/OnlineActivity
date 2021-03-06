﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineActivity.Models;
using OnlineActivity.Repositories;
using OnlineActivity.Result;

namespace OnlineActivity.Controllers.V1
{
    [Route("api/v1/games")]
    public sealed class V1GamesController : V1ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly IGameRepository gameRepository;
        private readonly IChatMessageRepository chatMessageRepository;
        private readonly IGameWordRepository gameWordRepository;
        private readonly IMapper mapper;

        public V1GamesController(IUserRepository userRepository, IGameRepository gameRepository, IChatMessageRepository chatMessageRepository, 
            IGameWordRepository gameWordRepository, IMapper mapper)
        {
            this.userRepository = userRepository;
            this.gameRepository = gameRepository;
            this.chatMessageRepository = chatMessageRepository;
            this.gameWordRepository = gameWordRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateGameAsync([FromBody] GameToCreateDto gameToCreateDto)
        {
            var gameEntity = mapper.Map<GameEntity>(gameToCreateDto);
            gameEntity.GameTimeInSeconds = 300;
            gameEntity.GameWordId = (await gameWordRepository.GetRandomAsync()).Id;

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

            var playerNamesById = new Dictionary<Guid, string>();


            foreach (var playerId in gameEntity.PlayersIds)
            {
                var player = await userRepository.GetAsync(playerId);
                playerNamesById[playerId] = player.Login;
                var playerToSend = mapper.Map<UserToSendDto>(player);
                gameToSendDto.Players.Add(playerToSend);
            }

            if (gameToSendDto.DrawerPlayerId != Guid.Empty)
                gameToSendDto.DrawerLogin = playerNamesById[gameEntity.DrawerPlayerId];

            foreach (var chatMessageId in gameEntity.ChatMessageIds)
            {
                var chatMessageEntity = await chatMessageRepository.GetAsync(chatMessageId);
                var messageDto = mapper.Map<ChatMessageToSendDto>(chatMessageEntity);
                messageDto.UserName = playerNamesById[messageDto.UserId];
                gameToSendDto.ChatMessages.Add(messageDto);
            }

            var passedTime = gameEntity.Status == GameStatus.Active
                ? (DateTime.UtcNow - gameEntity.StartTime.Value).Seconds
                : 0;


            var timeLeft = gameEntity.GameTimeInSeconds - passedTime;

            if (timeLeft < 0)
            {
                timeLeft = 0;
                if (gameEntity.Status == GameStatus.Active)
                {
                    gameEntity.Status = GameStatus.Finished;
                    await gameRepository.MergeAsync(gameEntity);
                }
            }

            gameToSendDto.GameTimeLeftInSeconds = timeLeft;

            gameToSendDto.GameWord = (await gameWordRepository.GetAsync(gameEntity.GameWordId)).Word;
            return Ok(gameToSendDto);
        }
    }
}
