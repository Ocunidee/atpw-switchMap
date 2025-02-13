import { Component, model, OnInit, signal } from '@angular/core'
import { User, UserService } from './user.service'
import { finalize } from 'rxjs'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  user = signal<User | undefined>(undefined)
  firstName = model('')
  loading = signal(false)

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUser()
  }

  editUser(): void {
    this.loading.set(true)
    this.userService.edit(this.firstName())
      .subscribe({ next: () => this.loadUser() }) // DO NOT DO THIS EVER (subscribe in subscribe) ;)
  }

  private loadUser(): void {
    this.loading.set(true)
    this.userService
      .details()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({ next: user => this.user.set(user) })
  }
}
