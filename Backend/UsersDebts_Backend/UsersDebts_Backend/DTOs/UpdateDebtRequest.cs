namespace UsersDebts_Backend.DTOs
{
    public class UpdateDebtRequest
    {
        public decimal Amount { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
