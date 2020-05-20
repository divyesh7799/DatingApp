using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;
using DatingAppProj.API.Data;
using System.Security.Claims;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace DatingAppProj.API.Helper
{
    public class LogUserActivity: IAsyncActionFilter
    {
        public async  Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();
            var userId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var repo = resultContext.HttpContext.RequestServices.GetService<IDatingRepository>();
            var user = await repo.GetUser(userId);
            user.LastActive = DateTime.Now;
            await repo.SaveAll();
        }
    }
}