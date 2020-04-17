import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactsService } from '../_services/contacts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: any;
  options: string;

  constructor(private contactsService: ContactsService, private route: ActivatedRoute) {

   }

  ngOnInit() {

    this.options = this.route.snapshot.queryParamMap.get('options');
    this.getContacts(this.options);
  }


  getContacts(options?: string) {
    console.log(options);
    this.contactsService.getAllContacts(options).subscribe(response => {
      console.log("Success!")
      this.contacts = response;
    }, error => {
      console.log(error);
    })
  }


  deleteContact(id: number) {
      if(confirm("This is a permanent action! Are you sure you wish to delete these contact?")){
        this.contactsService.deleteContact(id).subscribe(response => {
          alert("Contact as been deleted succesfully!");
          this.getContacts();
        }, error => {
          console.log(error);
        })
      }



  }



}
