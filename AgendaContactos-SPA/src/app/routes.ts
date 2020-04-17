import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailsComponent } from './contactDetails/contactDetails.component';
import { Routes } from '@angular/router';
import { CreateContactComponent } from './createContact/createContact.component';
import { ContactDetailsResolver } from './_resolver/contact-details.resolver';
import { ContactEditComponent } from './contactEdit/contactEdit.component';
import { ContactEditResolver } from './_resolver/contact-edit.resolver';


export const appRoutes: Routes = [
  { path: '', component: ContactsComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'contacts', component: ContactsComponent},
      { path: 'contacts/details/:id', component: ContactDetailsComponent, resolve: {contact: ContactDetailsResolver}},
      { path: 'contacts/create', component: CreateContactComponent},
      { path: 'contacts/edit/:id', component: ContactEditComponent, resolve: {contact: ContactEditResolver}},
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full'},


]
