import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""
  isLoading: boolean = false

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) { }



  ngOnInit() {
  
    const user = JSON.parse(localStorage.getItem('User')!)
    if (user !== null) {
      this.router.navigateByUrl('/home', { replaceUrl: true })
    } else {
      } error => {console.log("error" + error)}


  }

  login() {
    this.isLoading = true
    let credentials = {
      username: this.username,
      password: this.password
    }

    this.http.post('https://noteappmoviles-production.up.railway.app/users/login', {credentials})
      .subscribe(res => {
        this.isLoading = false
        localStorage.setItem('User', JSON.stringify(res))
        this.router.navigateByUrl('/home', { replaceUrl: true })
      }, error => {
        this.isLoading = false
        this.presentAlert('Login failed', error.error.error)
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


/*

    
      */