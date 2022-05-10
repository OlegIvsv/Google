using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using GooglePVI.Models;

namespace GooglePVI
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Account> Users { get; set; }
        public DbSet<Article> Articles { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }
    }
}
