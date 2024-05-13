using humidity.api.Entity.framework;
using Microsoft.EntityFrameworkCore;

namespace humidity.api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthorization();
            builder.Services.AddDbContext<InformationDbContext>(o =>
            {
                o.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=IOT_Project_Database;Trusted_Connection=True;");
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowSpecificOrigins");


            app.UseAuthorization();


            app.MapGet("/humidity", async (InformationDbContext context) =>
            {
                var humidityAndTemperature = context.Information.OrderBy(x => x.Id).Last();
                return humidityAndTemperature;
            }).WithName("GetHumidity");

            app.MapGet("/humidity-all-info", async (InformationDbContext context) =>
            {
                var humidityAndTemperature = context.Information.ToList();
                return humidityAndTemperature;
            }).WithName("Get-all-info");

            app.MapPost("/humidity", async (InformationDTO infoDTO, InformationDbContext context) =>
            {
                var info = new Information
                {
                    Temperature = infoDTO.Temperature,
                    Humidity = infoDTO.Humidity,
                    Time = infoDTO.Time,
                    WaterLevel = infoDTO.WaterLevel
                };
                if (infoDTO.WaterLevel <= 10)
                    info.WaterLevelCondition = "None";
                if (infoDTO.WaterLevel > 10 && infoDTO.WaterLevel < 40)
                    info.WaterLevelCondition = "Low";
                if (infoDTO.WaterLevel >= 40 && infoDTO.WaterLevel < 80)
                    info.WaterLevelCondition = "Medium";
                if (infoDTO.WaterLevel >= 80)
                    info.WaterLevelCondition = "Full";

                switch (info.WaterLevelCondition)
                {
                    case "None":
                        info.Danger = true;
                        break;
                    case "Low":
                        info.Danger = true;
                        break;
                    default:
                        info.Danger = false;
                        break;
                }

                context.Information.Add(info);
                await context.SaveChangesAsync();

                return Results.Created($"/todoitems/{info.Id}", info);
            });

            app.Run();
        }
    }
}