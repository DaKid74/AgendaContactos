using AgendaContactos.API.Helpers;
using AgendaContactos.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgendaContactos.API.Data
{
    public interface IContactsRepository
    {
        void Add<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        Task<bool> SaveAll();

        Task<List<Contact>> GetAllContacts(string options);

        Task<Contact> GetContactById(int id);

        Task<Contact> CreateContact(Contact contact);

    }
}
