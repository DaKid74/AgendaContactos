using AgendaContactos.API.Helpers;
using AgendaContactos.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Fabric.Query;
using System.Linq;
using System.Threading.Tasks;

namespace AgendaContactos.API.Data
{
    public class ContactsRepository : IContactsRepository
    {
        private readonly DataContext _context;

        public ContactsRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

       
        public async Task<List<Contact>> GetAllContacts(string options)
        {
            var contacts = _context.Contacts.OrderBy(o => o.Name).AsQueryable();

            if (!string.IsNullOrEmpty(options))
            {
                contacts = contacts.Where(x => x.Name.ToLower().Contains(options.ToLower()) || x.PhoneNumber.Contains(options));
            }


            return await contacts.ToListAsync();
        }

        public async Task<Contact> GetContactById(int id)
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id);

            return contact;
        }

        public async Task<Contact> CreateContact(Contact contact)
        {
            await _context.Contacts.AddAsync(contact);
            await SaveAll();

            return contact;
        }

    }
}
