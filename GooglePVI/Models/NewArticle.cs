using System;
using System.IO;
using GooglePVI.Helpers;
using System.ComponentModel.DataAnnotations;

namespace GooglePVI.Models
{
    public class NewArticle
    {
        public string Title { get; set; }
        [MinLength(0)]
        public string? Content { get; set; }
        public IFormFile? Picture { get; set; }

        public Article ToArticle()
        {
            byte[] pictureBytes = null;
            if (this.Picture != null)
            {
                var pictureHelper = new PictureHelper();
                pictureBytes = pictureHelper.ToByteArray(Picture);
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
