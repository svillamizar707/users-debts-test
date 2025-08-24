using UsersDebts_Backend.DTOs;
using UsersDebts_Backend.Models;

namespace UsersDebts_Backend.Services
{
    public interface IDebtService
    {
        Task<Debt?> CreateAsync(int userId, DebtRequest request);
        Task<IEnumerable<Debt>> GetAllAsync(int userId, bool? isPaid = null);
        Task<Debt?> GetByIdAsync(int userId, int debtId);
        Task<bool> UpdateAsync(int userId, int debtId, UpdateDebtRequest request);
        Task<bool> DeleteAsync(int userId, int debtId);
        Task<bool> MarkAsPaidAsync(int userId, int debtId);
    }
}
