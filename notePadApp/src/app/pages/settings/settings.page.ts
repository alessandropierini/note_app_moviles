import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: any
  password: string = ""
  bio: string = ""
  newInfo = []

  constructor(private router: Router, private httpClient: HttpClient, private alertController: AlertController) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User')!)
    console.log(this.user)
    if (this.user == null) {
      this.router.navigateByUrl('/login', { replaceUrl: true })
    } else {
      error => { console.log("error" + error) }
    }

  }

  eliminar() {
    this.httpClient.post('https://railway.app/project/54f5e5bb-30f0-4e33-a749-5bbfbfad388b/service/a8479972-22e3-431f-a942-dbf214ef87f4/users/eliminarUsuario', { username: this.user.username }).subscribe(res => {
      localStorage.clear()
      this.router.navigateByUrl('/register', { replaceUrl: true })
    }, error => {
      console.log(error)
      this.presentAlert('Eliminacion fallida', error.error.error)
    })
  }

  update() {
    let newInfo = {
      username: this.user.username,
      newPassword: this.password,
      newBio: this.bio
    }
    console.log("Update initialized")

    this.httpClient.post('https://railway.app/project/54f5e5bb-30f0-4e33-a749-5bbfbfad388b/service/a8479972-22e3-431f-a942-dbf214ef87f4/users/updateInfo', { info: newInfo }).subscribe(res => {
      console.log(res)
      this.router.navigateByUrl('', { replaceUrl: true })

    }, error => {
      console.log(error)
      this.presentAlert('Update failed', error.error.error)
    })
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: header,
      message: message,
      buttons: ['Ok']
    })

  }

  async presentConfirm() {
    let alert = this.alertController.create({
      header: 'ELIMINAR USUARIO',
      message: 'Estas seguro que deseas eliminar tu usuario? \n No hay manera de recuperar las notas.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar usuario permanentemente',
          handler: () => {
            this.httpClient.post('https://railway.app/project/54f5e5bb-30f0-4e33-a749-5bbfbfad388b/service/a8479972-22e3-431f-a942-dbf214ef87f4/users/eliminarUsuario', { username: this.user.username }).subscribe(res => {
              localStorage.clear()
              this.router.navigateByUrl('/register', { replaceUrl: true })
            }, error => {
              console.log(error)
              this.presentAlert('Eliminacion fallida', error.error.error)
            })
          }
        }
      ]
    });
    (await alert).present();
  }


}