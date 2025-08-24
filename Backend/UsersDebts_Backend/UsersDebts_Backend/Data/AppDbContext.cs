using Microsoft.EntityFrameworkCore;
using UsersDebts_Backend.Models;

namespace UsersDebts_Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Debt> Debts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Debt>().ToTable("debts");
            modelBuilder.Entity<Debt>()
                .HasCheckConstraint("CK_Debt_Amount_Positive", "Amount >= 0");
        }
    }
}
