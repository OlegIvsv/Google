namespace GooglePVI.Models
{
    public class NewAccount
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string IsAdmin { get; set; }

        public Account ToAccount()
        {
            return new Account
            {
                Name = this.Name,
                Password = this.Password,
                Email = this.Email,
                IsAdmin = this.IsAdmin.ToLower().Trim() == "true" ?  true : false,
                ProfilePicture = null
            };
        }
    }
}
