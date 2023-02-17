import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.page.html',
  styleUrls: ['./view-collection.page.scss'],
})
export class ViewCollectionPage implements OnInit {

  collectionTitle: any
  collectionDescription: any
  collectionOwner: any
  collectionId: any

  newCollectionDescription: any
  newCollectionTitle: any

  userNotesNotInCollection: any
  userNotesInCollection: any
  user: any

  editing: boolean = false

  constructor(private router: Router, private httpClient: HttpClient, private route: ActivatedRoute) { }

  sub: any


  ngOnInit() {
    this.collectionOwner = this.route.snapshot.paramMap.get("owner")
    this.collectionId = this.route.snapshot.paramMap.get("_id")

    this.collectionTitle = this.route.snapshot.paramMap.get("title")
    this.newCollectionTitle = this.collectionTitle

    this.collectionDescription = this.route.snapshot.paramMap.get("description")
    this.newCollectionDescription = this.collectionDescription

    this.user = JSON.parse(localStorage.getItem('User')!)
    console.log(this.user.username)

    if (this.user == null) {
      this.router.navigateByUrl('/login', { replaceUrl: true })
    } else {
      this.loadAllNotes()
    }
  }

  ionViewWillEnter() {

    this.collectionOwner = this.route.snapshot.paramMap.get("owner")
    this.collectionId = this.route.snapshot.paramMap.get("_id")

    this.collectionTitle = this.route.snapshot.paramMap.get("title")
    this.newCollectionTitle = this.collectionTitle

    this.collectionDescription = this.route.snapshot.paramMap.get("description")
    this.newCollectionDescription = this.collectionDescription

    this.user = JSON.parse(localStorage.getItem('User')!)

    this.loadAllNotes()
  }

  loadAllNotes() {

    this.user = JSON.parse(localStorage.getItem('User')!)

    this.httpClient.post('https://noteappmoviles-production.up.railway.app/notes/notInCollection', { name: this.user.username }).subscribe(res => {
      this.userNotesNotInCollection = res
    })
    let info = {
      user: this.user.username,
      id: this.collectionId
    }
    this.httpClient.post('https://noteappmoviles-production.up.railway.app/notes/InCollection', { info }).subscribe(res => {
      this.userNotesInCollection = res
    })
  }

  saveCollection() {
    let newInfo = {
      description: this.newCollectionDescription,
      title: this.newCollectionTitle,
      id: this.collectionId
    }
    console.log(newInfo)
    this.httpClient.post('https://noteappmoviles-production.up.railway.app/collections/updateCollection', { updatedCollection: newInfo }).subscribe(res => {
      this.router.navigateByUrl('/home', { replaceUrl: false })
    }

    )
  }

  editCollection() {
    if (this.editing == false) {
      this.editing = true
      console.log(this.editing)

    } else {
      this.editing = false
      console.log(this.editing)
    }
  }

  addNoteToCollection(notes) {
    let info = {
      username: this.collectionOwner,
      id: this.collectionId,
      noteId: notes._id
    }
    this.httpClient.post('https://noteappmoviles-production.up.railway.app/notes/addToCollection', { info: info }).subscribe(res => {
      console.log(res)
    })
    this.loadAllNotes()
  }

  removeNoteFromCollection(notes) {
    let info = {
      noteId: notes._id
    }
    this.httpClient.post('https://noteappmoviles-production.up.railway.app/notes/removeFromCollection', { info: info }).subscribe(res => {
      console.log(res)
    })
    this.loadAllNotes()
  }

}