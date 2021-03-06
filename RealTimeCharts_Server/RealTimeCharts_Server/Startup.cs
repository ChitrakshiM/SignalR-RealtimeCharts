﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RealTimeCharts_Server.HubConfig;
using System;

namespace RealTimeCharts_Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ////To enable CORS
            services.AddCors(options =>
            {
                       options.AddPolicy("CorsPolicy", 
                                        builder => builder.AllowAnyOrigin()
                                                            .AllowAnyHeader()
                                                            .AllowAnyMethod()
                                                            .AllowCredentials()
                                                            .SetPreflightMaxAge(TimeSpan.FromMinutes(10)));

            });
            
            services.AddSignalR();
            //services.AddSingleton<IUserIdProvider, CustomUserIdProvider>();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }
        //WithOrigins("http://localhost:4200/")

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseAuthentication();
 
            
            app.UseCors("CorsPolicy");
            app.UseSignalR(routes =>
            {
                routes.MapHub<ChartHub>("/chart");
            });
         
            app.UseHttpsRedirection();
            app.UseMvcWithDefaultRoute();
        }
    }
}
