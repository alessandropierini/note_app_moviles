import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  userCollections: any
  userNotes: any
  username: any
  user: any
  note: any

  constructor(private router: Router, private httpClient: HttpClient, private alertCtrl: AlertController) { }



  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('User')!)
    console.log(this.user.username)
    if (this.user == null) {
      this.router.navigateByUrl('/login', { replaceUrl: true })
    } else {
      this.httpClient.post('https://noteappmoviles-production.up.railway.app/notes', { name: this.user.username }).subscribe(res => {
        this.userNotes = res
      },
        error => { console.log("error" + error) })

      this.httpClient.post('https://noteappmoviles-production.up.railway.app/collections', { name: this.user.username }).subscribe(res => {
        this.userCollections = res
      },
        error => { console.log("error" + error) })
    }
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('User')!)

    this.httpClient.post('https://noteappmoviles-production.up.railway.app/notes', { name: this.user.username }).subscribe(res => {
      this.userNotes = res
    },
      error => { console.log("error" + error) })

    this.httpClient.post('https://noteappmoviles-production.up.railway.app/collections', { name: this.user.username }).subscribe(res => {
      this.userCollections = res
    },
      error => { console.log("error" + error) })

  }


  logout() {
    localStorage.clear()
    this.router.navigateByUrl('/login', { replaceUrl: true })
  }

  favorite(notes) {
    this.note = notes
    this.httpClient.post('https://noteappmoviles-production.up.railway.app/notes/favorite', { note: this.note }).subscribe(res => {
      this.userNotes = res
    }, error => { console.log("error" + error) })
  }

  showFavorites() {
    this.user = JSON.parse(localStorage.getItem('User')!)
    this.httpClient.post('https://noteappmoviles-production.up.railway.app/notes/showFavorites', { name: this.user.username }).subscribe(res => {
      this.userNotes = res
    },
      error => { console.log("error" + error) })
  }

  showAll() {
    this.user = JSON.parse(localStorage.getItem('User')!)
    this.httpClient.post('https://noteappmoviles-production.up.railway.app/notes', { name: this.user.username }).subscribe(res => {
      this.userNotes = res
    },
      error => { console.log("error" + error) })
  }

  async presentConfirmCollections(collections) {
    let alert = this.alertCtrl.create({
      header: 'ELIMINAR COLECCION',
      message: 'Deseas eliminar esta coleccion? No se eliminaran las notas.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log("trash")
            console.log(collections)

            this.httpClient.post('https://noteappmoviles-production.up.railway.app/collections/deleteCollection', { deletedCollection: collections }).subscribe(res => {
              this.userCollections = res
            },
              error => { console.log("error" + error) })
          }
        }
      ]
    });
    (await alert).present();
  }



  async presentConfirm(notes) {
    let alert = this.alertCtrl.create({
      header: 'ELIMINAR NOTA',
      message: 'Deseas eliminar esta nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log("trash")
            console.log(notes)

            this.httpClient.post('https://noteappmoviles-production.up.railway.app/notes/deleteNote', { deletedNote: notes }).subscribe(res => {
              this.userNotes = res
            },
              error => { console.log("error" + error) })
          }
        }
      ]
    });
    (await alert).present();
  }


}


