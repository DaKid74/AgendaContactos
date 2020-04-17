using AgendaContactos.API.Data;
using AgendaContactos.API.Helpers;
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
    public class ContactController : ControllerBase
    {
        private readonly IContactsRepository _repo;

        public ContactController(IContactsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetContacts([FromQuery] string options)
        {
            try
            {
                var contactsFromRepo = await _repo.GetAllContacts(options);

                return Ok(contactsFromRepo);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to get all contacts.");
            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetContactById(int id)
        {
            try
            {
                var contactFromRepo = await _repo.GetContactById(id);

                return Ok(contactFromRepo);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to get contact.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateContact(Contact contact)
        {
            try
            {
                await _repo.CreateContact(contact);
                return Ok(contact);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to create contact.");
            }

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, Contact contact)
        {
            try
            {
                if (id <= 0 && id != contact.Id)
                {
                    return BadRequest("ID isn't valid");
                }
                var contactFromRepo = await _repo.GetContactById(id);

                if (!string.IsNullOrEmpty(contact.Name))
                {
                    contactFromRepo.Name = contact.Name;
                }

                if (!string.IsNullOrEmpty(contact.PhoneNumber))
                {
                    contactFromRepo.PhoneNumber = contact.PhoneNumber;
                }

                if (await _repo.SaveAll())
                {
                    return NoContent();
                }

            }
            catch (Exception ex)
            {
                return BadRequest("Updating contact failed.");

            }

            return StatusCode(401);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            try
            {
                var contact = await _repo.GetContactById(id);

                _repo.Delete(contact);

                if (await _repo.SaveAll())
                {
                    return NoContent();
                }
            } catch (Exception ex)
            {
                return BadRequest("Deleting contact falied.");
            }

            return StatusCode(401);

        }

    }
}
