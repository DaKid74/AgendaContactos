import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getContacts();
  }


  getContacts() {
    this.http.get('http://localhost:5000/contacts').subscribe(response => {
      this.contacts = response;
    }, error => {
      console.log(error);
    })
  }

}
