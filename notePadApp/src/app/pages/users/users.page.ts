import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  user: any
  users: any

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User')!)
    console.log(this.user.username)
    if (this.user == null) {
      this.router.navigateByUrl('/login', { replaceUrl: true })
    } else {
      this.httpClient.get('https://railway.app/project/54f5e5bb-30f0-4e33-a749-5bbfbfad388b/service/a8479972-22e3-431f-a942-dbf214ef87f4/users/registeredUsers').subscribe(res => {
        this.users = res
        console.log(this.users)
      },
        error => { console.log("error" + error) })

    }
  }
}
