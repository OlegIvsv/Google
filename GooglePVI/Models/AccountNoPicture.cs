namespace GooglePVI.Models
{
    public class AccountNoPicture
    {
        public AccountNoPicture(Account account)
        {
            this.Id = account.Id;
            this.Name = account.Name;
            this.Password = account.Password;
            this.IsAdmin = account.IsAdmin;
            this.Email = account.Email;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
    }
}
