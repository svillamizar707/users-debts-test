namespace UsersDebts_Backend.DTOs
{
    public class DebtRequest
    {
        public decimal Amount { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
