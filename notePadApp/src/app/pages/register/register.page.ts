import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
  password: string = ""
  bio: string = ""
  isLoading: boolean = false
  userExists: boolean = true

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  
    const user = JSON.parse(localStorage.getItem('User')!)
    if (user !== null) {
      this.router.navigateByUrl('', { replaceUrl: true })
    } else {
      } error => {console.log("error" + error)}

  }

  register() {
    this.isLoading = true
    let user = {
      username: this.username,
      password: this.password,
      userExists: true,
      bio: this.bio

    }

    this.http.post('noteappmoviles-production.up.railway.app/users/register', user)
      .subscribe(res => {
        this.isLoading = false
        localStorage.setItem('User', JSON.stringify(res))
        this.router.navigateByUrl('', { replaceUrl: true })
      }, error => {
        this.isLoading = false
        console.log(error)
        this.presentAlert('Registration failed', error.error.error)
      })

  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: header,
      message: message,
      buttons: ['Ok']
    })

    await alert.present()

    const { role } = await alert.onDidDismiss()
    console.log('onDidDismiss resolved with role', role)

  }

}
