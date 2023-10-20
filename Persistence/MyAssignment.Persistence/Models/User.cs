using System.ComponentModel.DataAnnotations;

namespace MyAssignment.Persistence.Models
{
    public class User
    {
        [StringLength(20)]
        public string UserId { get; set; } = string.Empty;
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;
        [StringLength(256)]
        public string EmailId { get; set; } = string.Empty;
        [StringLength(20)]
        public string MobileNumber { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
