import { Component, OnInit } from '@angular/core'
import { User, UserService } from './user.service'
import { finalize, Observable, switchMap } from 'rxjs'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  user: User | undefined
  firstName = ''
  loading = false

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUser()
      .subscribe(user => this.user = user)
  }

  editUser() {
    this.loading = true
    this.userService
      .edit(this.firstName)
      .pipe(switchMap(() => this.loadUser())) // Compose the observable returned by the edit method with the one returned by loadUser()
      .subscribe({ next: user => {
        this.user = user
        this.firstName = ''
      } }) // Then subscribe to the result, save it and empty the input
  }

  private loadUser(): Observable<User> {
    this.loading = true

    return this.userService
      .details()
      .pipe(finalize(() => this.loading = false))
  }
}
