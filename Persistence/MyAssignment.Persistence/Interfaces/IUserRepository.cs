using MyAssignment.Persistence.Models;

namespace MyAssignment.Persistence.Interfaces
{

    public interface IUserRepository
    {
        Task<User> LoginAsync(User entity);
        Task RegistrationAsync(User entity);
    }

}
