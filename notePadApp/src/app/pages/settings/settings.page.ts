import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: string = ""
  password: string = ""
  bio: string = ""

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User')!)
    console.log(this.user)
    if (this.user == null) {
      this.router.navigateByUrl('/login', { replaceUrl: true })
    } else {
      error => { console.log("error" + error) }
    }
  }



  update() {
    let newInfo = {
      user: this.user,
      newPassword: this.password,
      newBio: this.bio
    }
    console.log(newInfo)

//quedaste aqui

    this.httpClient.post('http://localhost:3000/users/updateInfo', this.user ).subscribe(res => {
       console.log(res)
    })
  }

}

/**
 *  register() {
    this.isLoading = true
    let user = {
      username: this.username,
      password: this.password,
      userExists: true,
      bio: this.bio

    }

    this.http.post('http://localhost:3000/users/register', user)
      .subscribe(res => {
        this.isLoading = false
        localStorage.setItem('User', JSON.stringify(res))
        this.router.navigateByUrl('/login', { replaceUrl: true })
      }, error => {
        this.isLoading = false
        console.log(error)
        this.presentAlert('Registration failed', error.error.error)
      })

  }
 * 
 */