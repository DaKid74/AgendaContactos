import { Component, OnInit } from '@angular/core';
import { Contact } from '../_models/contact';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactsService } from '../_services/contacts.service';

@Component({
  selector: 'app-contactEdit',
  templateUrl: './contactEdit.component.html',
  styleUrls: ['./contactEdit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact;
  editForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder,private router: Router, private contactsService: ContactsService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.contact = data['contact'];
    });

    this.editContactForm(this.contact);
  }

  editContactForm(contact: Contact) {
    this.editForm = this.fb.group({
      name: [ contact.name , Validators.required],
      phoneNumber: [ contact.phoneNumber, [Validators.required, Validators.minLength(9)]],
    })
  }

  updateContact(id: number) {
    if (this.editForm.valid){
      this.contact = Object.assign({}, this.editForm.value);
      this.contact.id = id;
      this.contactsService.updateContact(this.contact.id,this.contact).subscribe(() => {
        alert("Contact updated succesfully!");
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
