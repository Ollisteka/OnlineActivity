using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineActivity.Models;
using OnlineActivity.Repositories;

namespace OnlineActivity.Controllers.V1
{
    [Route("api/v1/statistics")]
    public class V1StatiscticsController : V1ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public V1StatiscticsController(IUserRepository userRepository, IMapper mapper)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
        }

        [HttpGet("leaderboard")]
        public async Task<IActionResult> GetLeaderBoardAsync()
        {
            var users = await userRepository.GetUsersByPointsDescendingAsync();
            var leaderBoard = new LeaderBoardDto();
            foreach (var user in users)
            {
                leaderBoard.Users.Add(mapper.Map<UserToSendDto>(user));
            }
         
            return Ok(leaderBoard);
        }
    }
}
