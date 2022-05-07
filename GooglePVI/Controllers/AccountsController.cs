#nullable disable
using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GooglePVI;
using System.IO;

namespace GooglePVI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AccountsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet] // Get all accounts
        public async Task<ActionResult<IEnumerable<Account>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")] //Get account by id
        public async Task<ActionResult<Account>> GetAccount(int id)
        {
            var account = await _context.Users.FindAsync(id);
          
            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        [HttpGet("picture/{id}")] //Get profile picture by id
        public async Task<ActionResult<byte[]>> GetAccountPicture(int id)
        {
            var account = await _context.Users.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            return File(account.ProfilePicture, "image/png");
        }

        [HttpPut("{id}")] //Update profile picture
        public async Task<IActionResult> PutAccountPicture(int id, [FromForm(Name = "ProfilePicture")] IFormFile formFile)
        {
            var pictureBytes = new byte[formFile.Length];
            using (MemoryStream memoryStream = new MemoryStream())
            {
                formFile.CopyTo(memoryStream);
                pictureBytes = memoryStream.ToArray();
            }

            var account = _context.Users.Find(id);
            if(account == null)
                return BadRequest();
            account.ProfilePicture = pictureBytes;
            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        [HttpPost] //Post new account
        public async Task<ActionResult<NewAccount>> PostAccount([FromForm]NewAccount newAccount)
        {
            var account = newAccount.ToAccount();
            _context.Users.Add(account);
            await _context.SaveChangesAsync();
            return Ok(account);
        }

        [HttpDelete("{id}")] //Delete account
        public async Task<IActionResult> DeleteAccount(int id)
        {
            var account = await _context.Users.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Users.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("authorization/{login}/{password}")] //Authorization
        public ActionResult<Account> GetAccountWithAuthorization(string login, string password)
        {
            var account =  _context.Users
                .Where(a => a.Name == login  && a.Password == password)
                .FirstOrDefault();
            
            return account != null ? account : Unauthorized();
        }

        private bool AccountExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
