using UsersDebts_Backend.DTOs;
using UsersDebts_Backend.Services;

namespace UsersDebts_Backend.Routes
{
    public static class DebtRoutes
    {
        public static void MapDebtRoutes(this WebApplication app)
        {
            app.MapPost("/users/{userId}/debts", async (IDebtService debtService, int userId, DebtRequest req) =>
            {
                var debt = await debtService.CreateAsync(userId, req);
                return Results.Ok(debt);
            });

            app.MapGet("/users/{userId}/debts", async (IDebtService debtService, int userId, bool? isPaid) =>
            {
                var debts = await debtService.GetAllAsync(userId, isPaid);
                return Results.Ok(debts);
            });

            app.MapGet("/users/{userId}/debts/{debtId}", async (IDebtService debtService, int userId, int debtId) =>
            {
                var debt = await debtService.GetByIdAsync(userId, debtId);
                return debt is null ? Results.NotFound() : Results.Ok(debt);
            });

            app.MapPut("/users/{userId}/debts/{debtId}", async (IDebtService debtService, int userId, int debtId, UpdateDebtRequest req) =>
            {
                var result = await debtService.UpdateAsync(userId, debtId, req);
                return result ? Results.Ok() : Results.BadRequest();
            });

            app.MapDelete("/users/{userId}/debts/{debtId}", async (IDebtService debtService, int userId, int debtId) =>
            {
                var result = await debtService.DeleteAsync(userId, debtId);
                return result ? Results.Ok() : Results.NotFound();
            });

            app.MapPost("/users/{userId}/debts/{debtId}/pay", async (IDebtService debtService, int userId, int debtId) =>
            {
                var result = await debtService.MarkAsPaidAsync(userId, debtId);
                return result ? Results.Ok() : Results.BadRequest();
            });
        }
    }
}
