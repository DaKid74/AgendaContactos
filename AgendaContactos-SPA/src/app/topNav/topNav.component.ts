import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactsService } from '../_services/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topNav',
  templateUrl: './topNav.component.html',
  styleUrls: ['./topNav.component.css']
})
export class TopNavComponent implements OnInit {
  searchForm: FormGroup;
  searchQuery: string;
  baseUrl: string = "http://localhost:4200/";

  constructor(private fb: FormBuilder, private contactsService: ContactsService, private router: Router) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: [''],
    })
  }

  search(){
    if (this.searchForm.valid){
      let search = Object.assign({}, this.searchForm.value);
      this.searchQuery = search.search;
      console.log(this.searchQuery);
      window.location.href = this.baseUrl + "?options=" + this.searchQuery;
    }
  }


}
