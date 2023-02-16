import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.page.html',
  styleUrls: ['./create-collection.page.scss'],
})
export class CreateCollectionPage implements OnInit {

  title: string = ""
  description: string = ""
  owner: string = ""
  notes: any

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('User')!)
    console.log(user.username)
    this.owner = user.username
    
  }

  createNewCollection() {
    let collection = {
      title: this.title,
      description: this.description,
      owner: this.owner,      
    }

    this.http.post('https://railway.app/project/54f5e5bb-30f0-4e33-a749-5bbfbfad388b/service/a8479972-22e3-431f-a942-dbf214ef87f4/collections/createNewCollection', collection)
      .subscribe(res => {
        this.router.navigateByUrl('', { replaceUrl: true })
        console.log(res)
      }, error => {
        console.log(error)
        this.presentAlert('Collection creation failed', error.error.error)
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
