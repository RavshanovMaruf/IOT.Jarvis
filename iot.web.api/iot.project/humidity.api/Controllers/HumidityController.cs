using humidity.api.Entity.framework;
using Microsoft.AspNetCore.Mvc;

namespace humidity.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HumidityController : ControllerBase
    {
        private readonly InformationDbContext _context;
        public HumidityController(InformationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<string> Index()
        {
            return null;
        }
    }
}
