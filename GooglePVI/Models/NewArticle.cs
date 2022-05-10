using System;
using System.IO;
using GooglePVI.Helpers;

namespace GooglePVI.Models
{
    public class NewArticle
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public IFormFile Picture { get; set; }

        public Article ToArticle()
        {
            var pictureHelper = new PictureHelper();
            var pictureBytes = pictureHelper.ToByteArray(Picture);
            return new Article
            {
                Title = Title,
                Content = Content,
                Picture = pictureBytes
            };
        }
    }
}
