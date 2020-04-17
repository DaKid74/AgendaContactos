import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TopNavComponent } from './topNav/topNav.component';
import { ContactsService } from './_services/contacts.service';
import { FooterComponent } from './footer/footer.component';
import { ContactDetailsComponent } from './contactDetails/contactDetails.component';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { CreateContactComponent } from './createContact/createContact.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactDetailsResolver } from './_resolver/contact-details.resolver';
import { ContactEditResolver } from './_resolver/contact-edit.resolver';
import { ContactEditComponent } from './contactEdit/contactEdit.component';

@NgModule({
   declarations: [
      AppComponent,
      ContactsComponent,
      TopNavComponent,
      FooterComponent,
      ContactDetailsComponent,
      CreateContactComponent,
      ContactEditComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [
      ContactsService,
      ContactDetailsResolver,
      ContactEditResolver,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
