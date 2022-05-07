using System;
using System.Collections;
using System.Linq;

namespace GooglePVI.Helpers
{
    public class SelectItemsHelper
    {
        public IEnumerable<Article> Select(IEnumerable<Article> allArticles, IEnumerable<string> requestWords)
        {
            var selected = allArticles.Where(a =>requestWords.Any(w => a.Title.Contains(w)))
                .ToArray();
            return selected;
        }
    }
}
