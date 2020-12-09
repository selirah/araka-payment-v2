using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PCES.PaymentPlatform.Utility;
using Swashbuckle.AspNetCore.Swagger;


namespace PCES.PaymentPlatform.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private static ConfigSettings _configSettings;
        public static ConfigSettings ConfigSettings
        {
            get
            {
                if (_configSettings == null)
                    _configSettings = new ConfigSettings();
                return _configSettings;
            }
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = Configuration["Jwt:Issuer"],
            ValidAudience = Configuration["Jwt:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
        };
    });
            services.AddMvc();
            services.AddControllers().AddNewtonsoftJson();

            List<string> allowedOrigins = new List<string>();
            if (Configuration["CORSOptions:AllowedOrigins"] != null)
            {
                var additionalOrigins = Configuration["CORSOptions:AllowedOrigins"].Split(",", StringSplitOptions.RemoveEmptyEntries);
                allowedOrigins.AddRange(additionalOrigins);
            }
            services.AddCors();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo()
                {
                    //  Title = "PCES Payment Platform"
                    // Description = "PCES Payment Platform"
                    // Version = "v1",
                    // TermsOfService = new Uri("http://localhost:4314/terms")
                });

                var security = new Dictionary<string, IEnumerable<string>>
                {
                    {"Bearer", new string[] { }},
                };

                options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Description = "JWT Authorization",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Scheme = "bearer",
                    Type = SecuritySchemeType.ApiKey
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    {
                              new OpenApiSecurityScheme
                     {
                   Reference = new OpenApiReference
                     {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                       }
                      },
                      new string[] { }
                     }
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseStaticFiles();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();


            app.UseRouting();
            app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true) // allow any origin
                .AllowCredentials()); //

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


            app.UseStaticFiles(); // For the wwwroot folder
            app.UseStaticFiles(new StaticFileOptions    //For the '.well-known' folder
            {
                FileProvider = new PhysicalFileProvider(System.IO.Path.Combine(env.ContentRootPath, "/.well-known")),
                RequestPath = new PathString("/.well-known"),
                ServeUnknownFileTypes = true,
            });

            if (ConfigSettings.EnableSwagger)
            {
                app.UseSwagger(options =>
                {
                    options.RouteTemplate = "docs/{documentName}/docs.json";
                });
                app.UseSwaggerUI(options =>
                {
                    options.DefaultModelsExpandDepth(-1);
                    options.SwaggerEndpoint("../docs/v1/docs.json", "PCES Payment Platform");
                    options.RoutePrefix = "docs";
                    options.InjectStylesheet("../swagger-ui/custom.css");
                    options.DocumentTitle = "PCES Payment";
                });
            }

            //Insert middleware for catch all request and validation before submitting to controllers here
        }
    }
}
