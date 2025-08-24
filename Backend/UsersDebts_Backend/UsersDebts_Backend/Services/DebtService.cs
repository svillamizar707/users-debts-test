using UsersDebts_Backend.Data;
using UsersDebts_Backend.DTOs;
using UsersDebts_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace UsersDebts_Backend.Services
{
    public class DebtService : IDebtService
    {
        private readonly AppDbContext _context;

        public DebtService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Debt?> CreateAsync(int userId, DebtRequest request)
        {
            if (request.Amount < 0) throw new ArgumentException("El monto no puede ser negativo.");

            var debt = new Debt
            {
                UserId = userId,
                Amount = request.Amount,
                Description = request.Description
            };

            _context.Debts.Add(debt);
            await _context.SaveChangesAsync();
            return debt;
        }

        public async Task<IEnumerable<Debt>> GetAllAsync(int userId, bool? isPaid = null)
        {
            var query = _context.Debts.Where(d => d.UserId == userId);
            if (isPaid.HasValue)
                query = query.Where(d => d.IsPaid == isPaid.Value);

            return await query.ToListAsync();
        }

        public async Task<Debt?> GetByIdAsync(int userId, int debtId)
        {
            return await _context.Debts.FirstOrDefaultAsync(d => d.UserId == userId && d.Id == debtId);
        }

        public async Task<bool> UpdateAsync(int userId, int debtId, UpdateDebtRequest request)
        {
            var debt = await GetByIdAsync(userId, debtId);
            if (debt == null || debt.IsPaid) return false;
            if (request.Amount < 0) throw new ArgumentException("El monto no puede ser negativo.");

            debt.Amount = request.Amount;
            debt.Description = request.Description;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int userId, int debtId)
        {
            var debt = await GetByIdAsync(userId, debtId);
            if (debt == null) return false;
            _context.Debts.Remove(debt);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> MarkAsPaidAsync(int userId, int debtId)
        {
            var debt = await GetByIdAsync(userId, debtId);
            if (debt == null || debt.IsPaid) return false;

            debt.IsPaid = true;
            debt.PaidAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
