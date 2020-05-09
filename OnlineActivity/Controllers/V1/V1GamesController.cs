using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineActivity.Repositories;

namespace OnlineActivity.Controllers.V1
{
    [Route("api/v1/games")]
    public sealed class V1GamesController : V1ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public V1GamesController(IUserRepository userRepository, IMapper mapper)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
        }
    }
}
