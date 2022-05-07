using Microsoft.AspNetCore.Mvc;

namespace GooglePVI.Controllers
{
    public class HomeController : Controller
    {
        [ApiController]
        [Route("api/[controller]")]
        public class TestController : Controller
        {
            [HttpGet]
            public IActionResult Test() => Content("Hello World!");
        }

    }
}
