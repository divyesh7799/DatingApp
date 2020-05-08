using System.Threading.Tasks;
using DatingAppProj.API.Models;
namespace DatingAppProj.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Register (User user, string password);

         Task<User> Login (string usename, string password);
         Task<bool> UserExists(string usename);
    }
}