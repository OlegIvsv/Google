using System;
using System.Collections;
using System.Linq;
using GooglePVI.Models;
using Microsoft.EntityFrameworkCore;

namespace GooglePVI.Helpers
{
    public class SelectItemsHelper
    {
        public IEnumerable<ArticleNoPicture> Select(DbSet<Article> allArticles, IEnumerable<string> requestWords)
        {
            requestWords = requestWords.Select(w => w.ToLower()).ToList();
            var shorts = from a in allArticles
                         select new { a.Id, a.Title, a.Content, a.CreationTime};

            var selected = from a in shorts.ToArray()
                           let c = a.Title.ToLower().Split(' ', StringSplitOptions.RemoveEmptyEntries)
                                            .Intersect(requestWords)
                                            .Count()
                           where c > 0
                           orderby c descending
                           select new ArticleNoPicture
                           {
                               Id = a.Id,
                               Title = a.Title,
                               CreationTime = a.CreationTime,
                               Content = a.Content
                           };

            return selected.ToList();
        }
    }
}
