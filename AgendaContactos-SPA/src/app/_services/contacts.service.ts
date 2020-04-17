import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../_models/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  baseUrl = "http://localhost:5000/contact/"

constructor(private http: HttpClient) { }

  getAllContacts(options?: string){
    if(options != null){
      return this.http.get(this.baseUrl + "?options=" + options);
    }
    return this.http.get(this.baseUrl);

  }

  getContactById(id: number){
    return this.http.get(this.baseUrl + id);
  }

  createContact(contact: Contact){
    return this.http.post(this.baseUrl, contact);
  }

  updateContact(id: number, contact: Contact){
    return this.http.put(this.baseUrl + id, contact);
  }

  deleteContact(id: number){
    return this.http.delete(this.baseUrl + id);
  }
}
