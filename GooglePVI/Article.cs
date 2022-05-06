using System.ComponentModel.DataAnnotations;
using System.Web;

namespace GooglePVI
{
    public class Article
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string CreationTime { get; set; } = null!;
        public string? Content { get; set; }
        public byte[]? Picture { get; set; }
    }

    public class NewArticle
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public IFormFile Picture { get; set; }

        public Article ToArticle()
        {
            var pictureBytes = new byte[Picture.Length];
            using (MemoryStream memoryStream = new MemoryStream())
            {
                Picture.CopyTo(memoryStream);
                pictureBytes = memoryStream.ToArray();
            }

            return new Article
            {
                Title = Title,
                Content = Content,
                Picture = pictureBytes
            };
        }
    }
}
