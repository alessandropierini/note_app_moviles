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
      this.httpClient.post('http://localhost:3000/notes/notInCollection', { name: this.user.username }).subscribe(res => {
        this.userNotesNotInCollection = res
      },
        error => { console.log("error" + error) })
    }


    this.httpClient.post('http://localhost:3000/notes/InCollection', { name: this.user.username }).subscribe(res => {
      this.userNotesInCollection = res
    },
      error => { console.log("error" + error) })


  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('User')!)

    this.httpClient.post('http://localhost:3000/notes/notInCollection', { name: this.user.username }).subscribe(res => {
      this.userNotesNotInCollection = res
    },
      error => { console.log("error" + error) })
  }

  saveCollection() {
    console.log("saved")
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


}
