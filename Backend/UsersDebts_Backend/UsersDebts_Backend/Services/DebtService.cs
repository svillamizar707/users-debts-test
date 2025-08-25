using UsersDebts_Backend.Data;
using UsersDebts_Backend.DTOs;
using UsersDebts_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace UsersDebts_Backend.Services
{
    public class DebtService : IDebtService
    {
        private readonly AppDbContext _context;
        private readonly ICacheService _cache;

        public DebtService(AppDbContext context, ICacheService cache)
        {
            _context = context;
            _cache = cache;
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
            // Limpiar caché de deudas del usuario
            _cache.Remove($"debts_{userId}_all");
            _cache.Remove($"debts_{userId}_paid");
            _cache.Remove($"debts_{userId}_unpaid");
            return debt;
        }

        public async Task<IEnumerable<Debt>> GetAllAsync(int userId, bool? isPaid = null)
        {
            string cacheKey = isPaid == null ? $"debts_{userId}_all" : (isPaid.Value ? $"debts_{userId}_paid" : $"debts_{userId}_unpaid");
            var cached = _cache.Get<IEnumerable<Debt>>(cacheKey);
            if (cached != null) return cached;

            var query = _context.Debts.Where(d => d.UserId == userId);
            if (isPaid.HasValue)
                query = query.Where(d => d.IsPaid == isPaid.Value);

            var debts = await query.ToListAsync();
            _cache.Set(cacheKey, debts, TimeSpan.FromMinutes(5));
            return debts;
        }

        public async Task<Debt?> GetByIdAsync(int userId, int debtId)
        {
            string cacheKey = $"debt_{userId}_{debtId}";
            var cached = _cache.Get<Debt>(cacheKey);
            if (cached != null) return cached;

            var debt = await _context.Debts.FirstOrDefaultAsync(d => d.UserId == userId && d.Id == debtId);
            if (debt != null)
                _cache.Set(cacheKey, debt, TimeSpan.FromMinutes(5));
            return debt;
        }

        public async Task<bool> UpdateAsync(int userId, int debtId, UpdateDebtRequest request)
        {
            var debt = await GetByIdAsync(userId, debtId);
            if (debt == null || debt.IsPaid) return false;
            if (request.Amount < 0) throw new ArgumentException("El monto no puede ser negativo.");

            debt.Amount = request.Amount;
            debt.Description = request.Description;
            await _context.SaveChangesAsync();
            // Limpiar caché
            _cache.Remove($"debt_{userId}_{debtId}");
            _cache.Remove($"debts_{userId}_all");
            _cache.Remove($"debts_{userId}_paid");
            _cache.Remove($"debts_{userId}_unpaid");
            return true;
        }

        public async Task<bool> DeleteAsync(int userId, int debtId)
        {
            var debt = await GetByIdAsync(userId, debtId);
            if (debt == null) return false;
            _context.Debts.Remove(debt);
            await _context.SaveChangesAsync();
            // Limpiar caché
            _cache.Remove($"debt_{userId}_{debtId}");
            _cache.Remove($"debts_{userId}_all");
            _cache.Remove($"debts_{userId}_paid");
            _cache.Remove($"debts_{userId}_unpaid");
            return true;
        }

        public async Task<bool> MarkAsPaidAsync(int userId, int debtId)
        {
            var debt = await GetByIdAsync(userId, debtId);
            if (debt == null || debt.IsPaid) return false;

            debt.IsPaid = true;
            debt.PaidAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            // Limpiar caché
            _cache.Remove($"debt_{userId}_{debtId}");
            _cache.Remove($"debts_{userId}_all");
            _cache.Remove($"debts_{userId}_paid");
            _cache.Remove($"debts_{userId}_unpaid");
            return true;
        }
    }
}
