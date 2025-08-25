using UsersDebts_Backend.Data;
using UsersDebts_Backend.DTOs;
using UsersDebts_Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace UsersDebts_Backend.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private readonly ICacheService _cache;

        public UserService(AppDbContext context, ICacheService cache)
        {
            _context = context;
            _cache = cache;
        }

        public async Task<User?> RegisterAsync(RegisterUserRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
                return null;

            var user = new User
            {
                Email = request.Email,
                PasswordHash = HashPassword(request.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            // Limpiar caché de usuario por email
            _cache.Remove($"user_email_{request.Email}");
            return user;
        }

        public async Task<User?> AuthenticateAsync(LoginRequest request)
        {
            string cacheKey = $"user_email_{request.Email}";
            var cached = _cache.Get<User>(cacheKey);
            User? user;
            if (cached != null)
            {
                user = cached;
            }
            else
            {
                user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
                if (user != null)
                    _cache.Set(cacheKey, user, TimeSpan.FromMinutes(5));
            }
            if (user == null) return null;
            if (user.PasswordHash != HashPassword(request.Password))
                return null;
            return user;
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            string cacheKey = $"user_id_{id}";
            var cached = _cache.Get<User>(cacheKey);
            if (cached != null) return cached;
            var user = await _context.Users.FindAsync(id);
            if (user != null)
                _cache.Set(cacheKey, user, TimeSpan.FromMinutes(5));
            return user;
        }

        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }
    }
}
