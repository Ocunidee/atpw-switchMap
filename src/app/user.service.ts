import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = { firstName: 'John', lastName: 'Doe', email: 'john.doe@mail.com' }

  details(): Observable<User> {
    return of(this.user).pipe(delay(1000))
  }

  edit(firstName: string): Observable<void> {
    this.user = { ...this.user, firstName: firstName }
    console.log(this.user)

    return of(void 0).pipe(delay(1000))
  }
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}
