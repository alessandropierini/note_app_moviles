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

    this.httpClient.post('https://railway.app/project/54f5e5bb-30f0-4e33-a749-5bbfbfad388b/service/a8479972-22e3-431f-a942-dbf214ef87f4/notes/notInCollection', { name: this.user.username }).subscribe(res => {
      this.userNotesNotInCollection = res
    })
    let info = {
      user: this.user.username,
      id: this.collectionId
    }
    this.httpClient.post('https://railway.app/project/54f5e5bb-30f0-4e33-a749-5bbfbfad388b/service/a8479972-22e3-431f-a942-dbf214ef87f4/notes/InCollection', { info }).subscribe(res => {
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
    this.httpClient.post('https://railway.app/project/54f5e5bb-30f0-4e33-a749-5bbfbfad388b/service/a8479972-22e3-431f-a942-dbf214ef87f4/collections/updateCollection', { updatedCollection: newInfo }).subscribe(res => {
      this.router.navigateByUrl('/', { replaceUrl: false })
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
    this.httpClient.post('https://railway.app/project/54f5e5bb-30f0-4e33-a749-5bbfbfad388b/service/a8479972-22e3-431f-a942-dbf214ef87f4/notes/addToCollection', { info: info }).subscribe(res => {
      console.log(res)
    })
    this.loadAllNotes()
  }

  removeNoteFromCollection(notes) {
    let info = {
      noteId: notes._id
    }
    this.httpClient.post('https://railway.app/project/54f5e5bb-30f0-4e33-a749-5bbfbfad388b/service/a8479972-22e3-431f-a942-dbf214ef87f4/notes/removeFromCollection', { info: info }).subscribe(res => {
      console.log(res)
    })
    this.loadAllNotes()
  }

}