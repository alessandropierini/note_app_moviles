import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  selectedNote: any
  userNotes: any
  originalSelectedNote: any
  username: any
  user: any
  fav: boolean = false

  constructor(private router: Router, private httpClient: HttpClient) { }



  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('User')!)
    console.log(this.user.username)
    if (this.user == null) {
      this.router.navigateByUrl('/login', { replaceUrl: true })
    } else {
      this.httpClient.post('http://localhost:3000/notes', { name: this.user.username }).subscribe(res => {
        this.userNotes = res
      },
        error => { console.log("error" + error) })
    }
  }

  ionViewWillEnter(){
    this.user = JSON.parse(localStorage.getItem('User')!)
    this.httpClient.post('http://localhost:3000/notes', { name: this.user.username }).subscribe(res => {
      this.userNotes = res
      this.originalSelectedNote = res
    },
      error => { console.log("error" + error) })
  }

  onNoteSelect(e) {
    this.userNotes = this.originalSelectedNote
    this.selectedNote = e.detail.value
    this.userNotes = this.selectedNote.filter(noteSelec => {
      return noteSelec.favorite == this.selectedNote
    })

  }




  logout() {
    localStorage.clear()
    this.router.navigateByUrl('/login', { replaceUrl: true })
  }

  favoriteFx() {
    this.fav = true
    console.log("favoritos")
  }
  unFavoriteFx() {
    this.fav = false
    console.log("not favorites")
  }

  trash() {
    console.log("trash")
  }

}
