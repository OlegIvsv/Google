using System.ComponentModel.DataAnnotations;

namespace GooglePVI.Models
{
    public class Account
    {  
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public byte[]? ProfilePicture { get; set; }
    }
}
