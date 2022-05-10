using System.ComponentModel.DataAnnotations;
using System.Web;

namespace GooglePVI.Models
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
}
