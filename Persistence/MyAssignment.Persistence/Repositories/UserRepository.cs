using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MyAssignment.Persistence.Common;
using MyAssignment.Persistence.Interfaces;
using MyAssignment.Persistence.Models;

namespace MyAssignment.Persistence.Repositories
{

    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public UserRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<User> LoginAsync(User obj)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserId == obj.UserId && x.Password == Utilities.ConvertToEncrypt(obj.Password));
            return user;
        }

        public async Task RegistrationAsync(User obj)
        {
            await _dbContext.Database.ExecuteSqlRawAsync("spAddUser @user_id, @name, @email_id, @mobile_number, @password", 
                new SqlParameter("@user_id", obj.UserId),
                new SqlParameter("@name", obj.Name),
                new SqlParameter("@email_id", obj.EmailId),
                new SqlParameter("@mobile_number", obj.MobileNumber),
                new SqlParameter("@password", Utilities.ConvertToEncrypt(obj.Password)));
        }

    }

}
