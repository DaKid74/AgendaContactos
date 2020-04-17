import { Component, OnInit } from '@angular/core';
import { Contact } from '../_models/contact';
import { ContactsService } from '../_services/contacts.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-contactDetails',
  templateUrl: './contactDetails.component.html',
  styleUrls: ['./contactDetails.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact;


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.contact = data['contact'];
    });
  }




}
