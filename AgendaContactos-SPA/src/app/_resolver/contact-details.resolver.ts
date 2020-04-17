import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Contact } from '../_models/contact';
import { ContactsService } from '../_services/contacts.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ContactDetailsResolver implements Resolve<Contact> {
  /**
   *
   */
  constructor(private contactsService: ContactsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Contact> {
    return this.contactsService.getContactById(route.params['id']).pipe(
      catchError(error => {
        alert("Problem Retrieving Data. We screwed up. Sorry. Please try again. If the problem persists contact us through info@contactApp.com");
        this.router.navigate(['/contacts']);
        return of(null);
      })
    )
  }
}
