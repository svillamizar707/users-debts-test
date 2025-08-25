using UsersDebts_Backend.Data;
using UsersDebts_Backend.Services;
using UsersDebts_Backend.Routes;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

//Inyección de dependencias de servicios  
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDebtService, DebtService>();
builder.Services.AddSingleton<ICacheService, InMemoryCacheService>();

//Configuración Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Usar CORS antes de mapear las rutas
app.UseCors("AllowAngular");

app.MapUserRoutes();
app.MapDebtRoutes();

app.Run();
