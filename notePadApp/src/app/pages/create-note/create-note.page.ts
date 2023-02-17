import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.page.html',
  styleUrls: ['./create-note.page.scss'],
})
export class CreateNotePage implements OnInit {

  title: string = ""
  description: string = ""
  isLoading: boolean = false
  owner: string = ""
  info: string = ""

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('User')!)
    console.log(user.username)
    this.owner = user.username
    
  }

  createNewNote() {
    this.isLoading = true
    let note = {
      title: this.title,
      description: this.description,
      owner: this.owner,
      info: "",
      favorite: false,
      
    }

    this.http.post('noteappmoviles-production.up.railway.app/notes/createNewNote', note)
      .subscribe(res => {
        this.isLoading = false
        localStorage.setItem('note', JSON.stringify(res))
        this.router.navigateByUrl('', { replaceUrl: true })
      }, error => {
        this.isLoading = false
        console.log(error)
        this.presentAlert('Note creation failed', error.error.error)
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
