using AgendaContactos.API.Data;
using AgendaContactos.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgendaContactos.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly DataContext _context;

        public ContactsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllContacts()
        {
            var contacts = await _context.Contacts.ToListAsync();

            return Ok(contacts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetContactId(int id)
        {
            var search = await _context.Contacts.FirstOrDefaultAsync(x => x.Id == id);

            if(search != null)
            {
                return Ok(search);
            }

            return BadRequest("That user doesn't exist");
        }
    }
}
