using Microsoft.EntityFrameworkCore;

namespace humidity.api.Entity.framework
{
    public class InformationDbContext : DbContext
    {
        public InformationDbContext(DbContextOptions<InformationDbContext> dbContextOptions) : base(dbContextOptions)
        {
            Database.EnsureCreated();
        }

        public DbSet<Information> Information { get; set; }
    }
}
