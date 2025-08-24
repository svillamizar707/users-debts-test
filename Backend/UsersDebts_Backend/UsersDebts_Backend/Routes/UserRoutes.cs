using UsersDebts_Backend.DTOs;
using UsersDebts_Backend.Services;

namespace UsersDebts_Backend.Routes
{
    public static class UserRoutes
    {
        public static void MapUserRoutes(this WebApplication app)
        {
            app.MapPost("/register", async (IUserService userService, RegisterUserRequest req) =>
            {
                var user = await userService.RegisterAsync(req);
                return user is null ? Results.BadRequest("Email ya registrado") : Results.Ok(user);
            });

            app.MapPost("/login", async (IUserService userService, LoginRequest req) =>
            {
                var user = await userService.AuthenticateAsync(req);
                return user is null ? Results.Unauthorized() : Results.Ok(user);
            });
        }
    }
}
