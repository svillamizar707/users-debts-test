using UsersDebts_Backend.DTOs;
using UsersDebts_Backend.Models;

namespace UsersDebts_Backend.Services
{
    public interface IUserService
    {
        Task<User?> RegisterAsync(RegisterUserRequest request);
        Task<User?> AuthenticateAsync(LoginRequest request);
        Task<User?> GetByIdAsync(int id);
    }
}
