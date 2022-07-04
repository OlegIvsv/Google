#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GooglePVI;
using GooglePVI.Helpers;
using GooglePVI.Models;

namespace GooglePVI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ArticlesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticles()
        {
            return await _context.Articles.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ArticleNoPicture>> GetArticle(int id)
        {
            var article = await _context.Articles.FindAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            return new ArticleNoPicture(article);
        }

        [HttpGet("picture/{id}")]
        public async Task<ActionResult<byte[]>> GetArticlePicture(int id)
        {
            var article = await _context.Articles.FindAsync(id);

            if (article.Picture == null)
            {
                return NotFound();
            }

            return File(article.Picture, "image/png");
        }

        [HttpPost]
        public async Task<ActionResult<NewArticle>> PostArticle([FromForm]NewArticle newArticle)
        {
            var article = newArticle.ToArticle();
            article.CreationTime = DateTime.Now.ToString();
            _context.Articles.Add(article);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("find/{request}")]
        public async Task<IEnumerable<ArticleNoPicture>> FindArticlesByRequest(string request)
        {
            var parser = new RequestParseHelper();
            var selector = new SelectItemsHelper();
            var words = parser.Parse(request, "+");
            var articels = await Task.Run(() => selector.Select(_context.Articles, words));
            return articels;
        }

        private bool ArticleExists(int id)
        {
            return _context.Articles.Any(e => e.Id == id);
        }
    }
}
