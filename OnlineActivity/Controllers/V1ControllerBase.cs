using Microsoft.AspNetCore.Mvc;

namespace OnlineActivity.Controllers
{
    [ApiController]
    [Produces("application/json", "application/xml")]
    [Consumes("application/json")]
    public abstract class V1ControllerBase : ControllerBase
    {
    }
}