import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  selectedNote: any
  userNotes: any
  username: any
  user: any
  fav: boolean = false

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    var user = this.user
    user = JSON.parse(localStorage.getItem('User')!)
    this.username = user.username
    if (user == null) {
      this.router.navigateByUrl('/login', { replaceUrl: true })
    } else {

      //deberia de estar enviando el username a server

      this.httpClient.post('http://localhost:3000/notes', {name: this.username} ).subscribe(res => 
      {
        this.userNotes = res
        
        console.log(this.userNotes)
        console.log("favorite:" + this.fav)
      }, 
      error => {console.log("error" + error)})
    }
  }

  onNoteSelect(e) {
    this.selectedNote = e.detail.value
    console.log(this.selectedNote)
  }


  logout(){
    this.user = null
    this.router.navigateByUrl('/login', { replaceUrl: true })
  }

  favoriteFx(){
    this.fav = true
    console.log("favoritos")
  }
  unFavoriteFx(){
    this.fav = false
  }

  trash(){
    console.log("trash")
  }

}
