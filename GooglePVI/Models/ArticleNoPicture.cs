namespace GooglePVI.Models
{
    public class ArticleNoPicture
    {
        public ArticleNoPicture()
        {
        }
        public ArticleNoPicture(Article article)
        {
            this.Id = article.Id;
            this.Title = article.Title;
            this.Content = article.Content;
            this.CreationTime = article.CreationTime;
        }
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string CreationTime { get; set; } = null!;
        public string? Content { get; set; }
    }
}
