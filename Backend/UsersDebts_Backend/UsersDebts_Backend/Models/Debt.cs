using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UsersDebts_Backend.Models
{
    [Table("debts")]
    public class Debt
    {
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("user_id")]
        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        [Required]
        [Column("amount")]
        [Range(0, double.MaxValue, ErrorMessage = "El monto no puede ser negativo.")]
        public decimal Amount { get; set; }

        [Required]
        [Column("description")]
        public string Description { get; set; } = string.Empty;

        [Column("is_paid")]
        public bool IsPaid { get; set; } = false;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("paid_at")]
        public DateTime? PaidAt { get; set; }
    }
}
