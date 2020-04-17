import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../_models/contact';
import { ContactsService } from '../_services/contacts.service';

@Component({
  selector: 'app-createContact',
  templateUrl: './createContact.component.html',
  styleUrls: ['./createContact.component.css']
})
export class CreateContactComponent implements OnInit {
  contact: Contact;
  createForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private contactsService: ContactsService) { }

  ngOnInit() {
    this.createContactForm();
  }

  createContactForm() {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
    })
  }

  createContact() {
    if (this.createForm.valid){
      this.contact = Object.assign({}, this.createForm.value);
      this.contactsService.createContact(this.contact).subscribe(() => {
        alert("Contact added succesfully!");
        this.router.navigate(['/contacts']);
      }, error => {
        alert("We screwed up, sorry. Please try again.");
        this.router.navigate(['/contacts']);
      })
    }
  }

  cancel() {
    if(confirm("Are you sure you wish to cancel this? No info will be saved.")){
      this.router.navigate(['/contacts']);
    }
  }

}
